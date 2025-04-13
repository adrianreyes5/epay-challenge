const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet.controller");
const { validate } = require("../middlewares/validation.middleware");
const { rechargeWalletValidator } = require("../validators/wallet.validator");

/**
 * @swagger
 * tags:
 *   name: Wallets
 *   description: Operaciones relacionadas con billeteras
 */

/**
 * @swagger
 * /api/wallets/balance:
 *   get:
 *     summary: Consulta el saldo de la billetera de un cliente
 *     description: Permite consultar el saldo de la billetera de un cliente mediante su documento y número de teléfono
 *     tags: [Wallets]
 *     parameters:
 *       - name: document
 *         in: query
 *         required: true
 *         description: Documento de identidad del cliente
 *         schema:
 *           type: string
 *         example: "1234567890"
 *       - name: phone
 *         in: query
 *         required: true
 *         description: Número de teléfono del cliente
 *         schema:
 *           type: string
 *         example: "3001234567"
 *     responses:
 *       200:
 *         description: Consulta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Consulta de saldo exitosa"
 *                 data:
 *                   type: object
 *                   properties:
 *                     document:
 *                       type: string
 *                       example: "1234567890"
 *                     firstName:
 *                       type: string
 *                       example: "Juan"
 *                     lastName:
 *                       type: string
 *                       example: "Pérez"
 *                     balance:
 *                       type: number
 *                       example: 150000
 *                     hasWallet:
 *                       type: boolean
 *                       example: true
 *                     walletCreatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-05-01T10:30:00Z"
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "El documento debe tener al menos 5 caracteres"
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *       404:
 *         description: Cliente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Cliente no encontrado. Verifique documento y teléfono"
 *                 statusCode:
 *                   type: number
 *                   example: 404
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor"
 *                 statusCode:
 *                   type: number
 *                   example: 500
 */
router.get("/balance", walletController.getBalance);

/**
 * @swagger
 * /api/wallets/recharge:
 *   post:
 *     summary: Recarga la billetera de un cliente
 *     description: Permite recargar la billetera de un cliente mediante su documento y número de teléfono
 *     tags: [Wallets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - document
 *               - phone
 *               - amount
 *             properties:
 *               document:
 *                 type: string
 *                 description: Documento de identidad del cliente
 *                 example: "1234567890"
 *               phone:
 *                 type: string
 *                 description: Número de teléfono del cliente
 *                 example: "3001234567"
 *               amount:
 *                 type: number
 *                 description: Monto a recargar
 *                 example: 50000
 *     responses:
 *       200:
 *         description: Recarga exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Recarga exitosa"
 *                 data:
 *                   type: object
 *                   properties:
 *                     document:
 *                       type: string
 *                       example: "1234567890"
 *                     firstName:
 *                       type: string
 *                       example: "Juan"
 *                     lastName:
 *                       type: string
 *                       example: "Pérez"
 *                     newBalance:
 *                       type: number
 *                       example: 150000
 *                     amount:
 *                       type: number
 *                       example: 50000
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "El monto debe ser mayor a cero"
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *       404:
 *         description: Cliente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Cliente no encontrado. Verifique documento y teléfono"
 *                 statusCode:
 *                   type: number
 *                   example: 404
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor"
 *                 error:
 *                   type: string
 *                   example: "Error al procesar la recarga"
 *                 statusCode:
 *                   type: number
 *                   example: 500
 */
router.post(
  "/recharge",
  validate(rechargeWalletValidator),
  walletController.rechargeWallet
);

module.exports = router;
