const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");
const { validate } = require("../middlewares/validation.middleware");
const { 
  createPaymentSessionValidator, 
  confirmPaymentValidator 
} = require("../validators/payment.validator");

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Operaciones relacionadas con pagos
 */

/**
 * @swagger
 * /api/payments/create-session:
 *   post:
 *     summary: Crear una sesión de pago
 *     description: Crea una sesión de pago y envía un token de confirmación al correo del cliente
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - document
 *               - amount
 *             properties:
 *               document:
 *                 type: string
 *                 description: Documento de identidad del cliente
 *                 example: "1234567890"
 *               amount:
 *                 type: number
 *                 description: Monto a pagar
 *                 example: 25000
 *     responses:
 *       201:
 *         description: Sesión de pago creada exitosamente
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
 *                   example: "Sesión de pago creada. Se ha enviado un token de confirmación al correo electrónico registrado."
 *                 data:
 *                   type: object
 *                   properties:
 *                     sessionId:
 *                       type: integer
 *                       example: 123
 *                     expiresAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-05-01T15:30:00Z"
 *                 statusCode:
 *                   type: number
 *                   example: 201
 *       400:
 *         description: Error de validación o saldo insuficiente
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
 *                   example: "Saldo insuficiente para realizar el pago"
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
 *                   example: "Cliente no encontrado"
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
router.post(
  "/create-session",
  validate(createPaymentSessionValidator),
  paymentController.createPaymentSession
);

/**
 * @swagger
 * /api/payments/confirm:
 *   post:
 *     summary: Confirmar un pago
 *     description: Confirma un pago utilizando el ID de sesión y el token enviado al correo
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sessionId
 *               - token
 *             properties:
 *               sessionId:
 *                 type: integer
 *                 description: ID de la sesión de pago
 *                 example: 123
 *               token:
 *                 type: string
 *                 description: Token de confirmación
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Pago confirmado exitosamente
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
 *                   example: "Pago confirmado exitosamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     document:
 *                       type: string
 *                       example: "1234567890"
 *                     amount:
 *                       type: number
 *                       example: 25000
 *                     newBalance:
 *                       type: number
 *                       example: 75000
 *                     paymentDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-05-01T15:35:00Z"
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *       400:
 *         description: Error de validación, token inválido o sesión expirada
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
 *                   example: "Token de confirmación inválido"
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *       404:
 *         description: Sesión de pago no encontrada
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
 *                   example: "Sesión de pago no encontrada"
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
router.post(
  "/confirm",
  validate(confirmPaymentValidator),
  paymentController.confirmPayment
);

module.exports = router;
