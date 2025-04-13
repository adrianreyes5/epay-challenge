const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const crypto = require("crypto");
const emailService = require("./email.service");

/**
 * Service for payment operations
 */
class PaymentService {
  /**
   * Generate a random 6-digit token
   * @returns {string} 6-digit token
   */
  generateToken() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Create a payment session
   */
  async createPaymentSession(document, amount) {
    try {
      // Find client by document
      const client = await prisma.client.findFirst({
        where: { document },
        include: { wallet: true },
      });

      if (!client) {
        return {
          success: false,
          message: "Cliente no encontrado",
          statusCode: 404,
        };
      }

      // Check if client has a wallet
      if (!client.wallet) {
        return {
          success: false,
          message: "El cliente no tiene una billetera activa",
          statusCode: 400,
        };
      }

      // Check if wallet has enough balance
      if (client.wallet.balance < amount) {
        return {
          success: false,
          message: "Saldo insuficiente para realizar el pago",
          statusCode: 400,
        };
      }

      // Generate token
      const token = this.generateToken();

      // Set expiration time (15 minutes from now)
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 15);

      // Create payment session
      const paymentSession = await prisma.paymentSession.create({
        data: {
          clientId: client.id,
          amount,
          token,
          status: "PENDING",
          expiresAt,
        },
      });

      // Send token to client's email
      await emailService.sendPaymentToken(
        client.email,
        token,
        paymentSession.id,
        amount
      );

      return {
        success: true,
        message:
          "Sesión de pago creada. Se ha enviado un token de confirmación al correo electrónico registrado.",
        data: {
          sessionId: paymentSession.id,
          expiresAt,
        },
        statusCode: 201,
      };
    } catch (error) {
      console.error("Error en createPaymentSession service:", error);
      return {
        success: false,
        message: "Error al crear la sesión de pago",
        statusCode: 500,
      };
    }
  }

  /**
   * Confirm a payment with token
   */
  async confirmPayment(sessionId, token) {
    try {
      const paymentSession = await prisma.paymentSession.findUnique({
        where: { id: sessionId },
        include: { client: { include: { wallet: true } } },
      });

      if (!paymentSession) {
        return {
          success: false,
          message: "Sesión de pago no encontrada",
          statusCode: 404,
        };
      }

      if (paymentSession.status !== "PENDING") {
        return {
          success: false,
          message: `Esta sesión de pago ya ha sido ${
            paymentSession.status === "CONFIRMED" ? "confirmada" : "cancelada"
          }`,
          statusCode: 400,
        };
      }

      // Check if session is expired
      if (new Date() > paymentSession.expiresAt) {
        await prisma.paymentSession.update({
          where: { id: sessionId },
          data: { status: "EXPIRED" },
        });

        return {
          success: false,
          message: "La sesión de pago ha expirado",
          statusCode: 400,
        };
      }

      // Verify token
      if (paymentSession.token !== token) {
        return {
          success: false,
          message: "Token de confirmación inválido",
          statusCode: 400,
        };
      }

      if (paymentSession.client.wallet.balance < paymentSession.amount) {
        await prisma.paymentSession.update({
          where: { id: sessionId },
          data: { status: "CANCELLED" },
        });

        return {
          success: false,
          message: "Saldo insuficiente para realizar el pago",
          statusCode: 400,
        };
      }

      const updatedWallet = await prisma.wallet.update({
        where: { id: paymentSession.client.wallet.id },
        data: {
          balance: {
            decrement: paymentSession.amount,
          },
        },
      });

      await prisma.transaction.create({
        data: {
          walletId: paymentSession.client.wallet.id,
          type: "PAYMENT",
          amount: paymentSession.amount,
          description: `Pago con ID de sesión: ${sessionId}`,
        },
      });

      await prisma.paymentSession.update({
        where: { id: sessionId },
        data: { status: "CONFIRMED" },
      });

      return {
        success: true,
        message: "Pago confirmado exitosamente",
        data: {
          document: paymentSession.client.document,
          amount: paymentSession.amount,
          newBalance: updatedWallet.balance,
          paymentDate: new Date(),
        },
        statusCode: 200,
      };
    } catch (error) {
      console.error("Error en confirmPayment service:", error);
      return {
        success: false,
        message: "Error al confirmar el pago",
        statusCode: 500,
      };
    }
  }
}

module.exports = new PaymentService();
