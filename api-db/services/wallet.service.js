const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Service for wallet operations
 */
class WalletService {
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
