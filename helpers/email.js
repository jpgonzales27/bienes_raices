import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  console.log(datos);
  const { nombre, email, token } = datos;

  //enviar email
  await transport.sendMail({
    from: "BienesRaices.com",
    to: email,
    subject: "Confirma tu cuenta en bienesraices.com",
    text: "Confirma tu cuenta en bienesraices.com",
    html: `
        <p> Hola ${nombre} Confirma tu cuenta en bienesraices.com</p>
        <p> Tu cuenta ya esta lista solo debes confirmarla en el siguiente enlace
        <a href="${process.env.BACKEND_URL}:${
      process.env.PORT ?? 3000
    }/auth/confirmar/${token}">confirmar cuenta</a> </p>
        <p> Si tu no creaste esta cuenta puedes ignorar este mensaje</p>
    `,
  });
};
