const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client.controller");
const { validate } = require("../middlewares/validation.middleware");
const { registerClientSchema } = require("../validators/client.validator");

/**
 * @swagger
 * /api/clients/register:
 *   post:
 *     tags:
 *       - Clients
 *     summary: Register a new client
 *     description: Creates a new client with the provided information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - document
 *               - firstName
 *               - lastName
 *               - email
 *               - phone
 *             properties:
 *               document:
 *                 type: string
 *                 description: Client identification document
 *                 example: "1234567890"
 *               firstName:
 *                 type: string
 *                 description: Client first name
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: Client last name
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Client email address
 *                 example: "john.doe@example.com"
 *               phone:
 *                 type: string
 *                 description: Client phone number
 *                 example: "3001234567"
 *     responses:
 *       201:
 *         description: Client registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientResponse'
 *       400:
 *         description: Bad request - Validation error or duplicate client
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  "/register",
  validate(registerClientSchema),
  clientController.registerClient
);

module.exports = router;
