const z = require("zod");

/**
 * Schema for validating wallet recharge data
 */
const rechargeWalletValidator = z.object({
  document: z
    .string()
    .min(5, { message: "El documento debe tener al menos 5 caracteres" })
    .max(20, { message: "El documento debe tener máximo 20 caracteres" }),
  phone: z
    .string()
    .min(7, { message: "El teléfono debe tener al menos 7 caracteres" })
    .max(15, { message: "El teléfono debe tener máximo 15 caracteres" }),
  amount: z
    .number({ message: "El monto debe ser un número" })
    .positive({ message: "El monto debe ser un valor positivo" }),
});

module.exports = {
  rechargeWalletValidator,
};
