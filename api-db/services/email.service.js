const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

/**
 * Service for email operations
 */
class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: process.env.EMAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  /**
   * Send payment token to user's email
   */
  async sendPaymentToken(email, token, sessionId, amount) {
    try {
      // Configuración del correo
      const mailOptions = {
        from: `"ePayco Wallet" <${process.env.EMAIL_USER || "epay@gmail.com"}>`,
        to: email,
        subject: "Token de confirmación de pago - ePayco Wallet",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2 style="color: #2c3e50; text-align: center;">Confirmación de Pago</h2>
            <p>Estimado cliente,</p>
            <p>Se ha solicitado un pago desde su billetera ePayco por un valor de <strong>$${amount.toLocaleString(
              "es-CO"
            )}</strong>.</p>
            <p>Para confirmar este pago, utilice el siguiente token:</p>
            <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
              ${token}
            </div>
            <p><strong>ID de Sesión:</strong> ${sessionId}</p>
            <p><strong>Importante:</strong> Este token expirará en 15 minutos.</p>
            <p>Si usted no solicitó este pago, por favor ignore este mensaje.</p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #7f8c8d; font-size: 12px;">
              <p>Atentamente,<br>Equipo ePayco Wallet</p>
            </div>
          </div>
        `,
        text: `
          Estimado cliente,
          
          Se ha solicitado un pago desde su billetera ePayco por un valor de $${amount}.
          
          Para confirmar este pago, utilice el siguiente token:
          
          TOKEN: ${token}
          
          ID de Sesión: ${sessionId}
          
          Este token expirará en 15 minutos.
          
          Si usted no solicitó este pago, por favor ignore este mensaje.
          
          Atentamente,
          Equipo ePayco Wallet
        `,
      };

      // Enviar el correo
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Correo enviado: ${info.messageId}`);

      // En modo desarrollo, mostrar la URL de vista previa (solo funciona con ethereal.email)
      if (process.env.NODE_ENV !== "production") {
        console.log(
          `URL de vista previa: ${nodemailer.getTestMessageUrl(info)}`
        );
      }

      return true;
    } catch (error) {
      console.error("Error en sendPaymentToken:", error);

      return false;
    }
  }
}

module.exports = new EmailService();
