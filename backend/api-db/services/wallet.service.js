const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Service for wallet operations
 */
class WalletService {
  /**
   * Get wallet balance by document and phone
   */
  async getBalance(document, phone) {
    if (!document || !phone) {
      return {
        success: false,
        message: "Datos inválidos",
        statusCode: 400,
      };
    }

    try {
      const client = await prisma.client.findFirst({
        where: {
          document: document,
          phone: phone,
        },
        include: {
          wallet: true,
        },
      });

      if (!client) {
        return {
          success: false,
          message: "Cliente no encontrado. Verifique documento y teléfono",
          statusCode: 404,
        };
      }

      if (!client.wallet) {
        return {
          success: true,
          message: "El cliente no tiene una billetera activa",
          data: {
            document: client.document,
            firstName: client.firstName,
            lastName: client.lastName,
            balance: 0,
            hasWallet: false,
          },
          statusCode: 200,
        };
      }

      return {
        success: true,
        message: "Consulta de saldo exitosa",
        data: {
          document: client.document,
          firstName: client.firstName,
          lastName: client.lastName,
          balance: client.wallet.balance,
          hasWallet: true,
          walletCreatedAt: client.wallet.createdAt,
        },
        statusCode: 200,
      };
    } catch (error) {
      console.error("Error en getBalance service:", error);
      return {
        success: false,
        message: "Error al consultar el saldo",
        statusCode: 500,
      };
    }
  }

  /**
   * Recharge a client's wallet
   */
  async rechargeWallet(document, phone, amount) {
    try {
      if (amount <= 0) {
        return {
          success: false,
          message: "El monto debe ser mayor a cero",
          statusCode: 400,
        };
      }

      const client = await prisma.client.findFirst({
        where: {
          document,
          phone,
        },
      });

      if (!client) {
        return {
          success: false,
          message: "Cliente no encontrado. Verifique documento y teléfono",
          statusCode: 404,
        };
      }

      let wallet = await prisma.wallet.findUnique({
        where: {
          clientId: client.id,
        },
      });

      // If the wallet doesn't exist, create it
      if (!wallet) {
        wallet = await prisma.wallet.create({
          data: {
            clientId: client.id,
            balance: 0,
          },
        });
      }

      const updatedWallet = await prisma.wallet.update({
        where: {
          id: wallet.id,
        },
        data: {
          balance: {
            increment: amount,
          },
        },
      });

      // Register the transaction
      await prisma.transaction.create({
        data: {
          walletId: wallet.id,
          type: "DEPOSIT",
          amount,
          description: "Recarga de billetera",
        },
      });

      return {
        success: true,
        message: "Recarga exitosa",
        data: {
          document: client.document,
          firstName: client.firstName,
          lastName: client.lastName,
          newBalance: updatedWallet.balance,
          amount,
        },
        statusCode: 200,
      };
    } catch (error) {
      console.error("Error en rechargeWallet service:", error);
      return {
        success: false,
        message: "Error al procesar la recarga",
        statusCode: 500,
      };
    }
  }
}

module.exports = new WalletService();
