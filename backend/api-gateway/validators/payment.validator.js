const z = require("zod");

/**
 * Schema for validating payment session creation
 */
const createPaymentSessionValidator = z.object({
  document: z
    .string()
    .min(5, { message: "El documento debe tener al menos 5 caracteres" })
    .max(20, { message: "El documento debe tener máximo 20 caracteres" }),
  amount: z
    .number({ message: "El monto debe ser un número" })
    .positive({ message: "El monto debe ser un valor positivo" })
});

/**
 * Schema for validating payment confirmation
 */
const confirmPaymentValidator = z.object({
  sessionId: z
    .number({ message: "El ID de sesión debe ser un número" })
    .int({ message: "El ID de sesión debe ser un número entero" })
    .positive({ message: "El ID de sesión debe ser un valor positivo" }),
  token: z
    .string()
    .length(6, { message: "El token debe tener exactamente 6 caracteres" })
    .regex(/^\d+$/, { message: "El token debe contener solo dígitos" })
});

module.exports = {
  createPaymentSessionValidator,
  confirmPaymentValidator
};
