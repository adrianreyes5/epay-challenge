const { z } = require("zod");

/**
 * Schema for validating client registration data
 */
const registerClientSchema = z.object({
  document: z
    .string()
    .min(5, { message: "Document must be at least 5 characters" })
    .max(20, { message: "Document cannot exceed 20 characters" })
    .nonempty({ message: "Document is required" }),

  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name cannot exceed 50 characters" })
    .nonempty({ message: "First name is required" }),

  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50, { message: "Last name cannot exceed 50 characters" })
    .nonempty({ message: "Last name is required" }),

  email: z
    .string()
    .email({ message: "Invalid email format" })
    .nonempty({ message: "Email is required" }),

  phone: z
    .string()
    .min(7, { message: "Phone number must be at least 7 characters" })
    .max(15, { message: "Phone number cannot exceed 15 characters" })
    .nonempty({ message: "Phone number is required" }),
});

const validateClientRegistration = (data) => {
  try {
    registerClientSchema.parse(data);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return {
        success: false,
        errors: formattedErrors,
      };
    }

    return {
      success: false,
      errors: [{ message: "Invalid input data" }],
    };
  }
};

module.exports = {
  registerClientSchema,
  validateClientRegistration,
};
