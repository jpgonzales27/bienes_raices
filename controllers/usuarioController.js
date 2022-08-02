import Usuario from "../models/Usuarios.js";

export const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Inicia Sesion",
  });
};

export const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "Crear Cuenta",
  });
};

export const registrarUsuario = async (req, res) => {
  console.log(req.body);
  const usuario = await Usuario.create(req.body);
  res.json(usuario);
};

export const formularioOlvidePassword = (req, res) => {
  res.render("auth/olvide-password", {
    pagina: "Recupe tu acceso a Bienes Raices",
  });
};
