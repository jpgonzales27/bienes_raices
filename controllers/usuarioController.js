import { check, validationResult } from "express-validator";
import { emailRegistro } from "../helpers/email.js";
import { generarId } from "../helpers/token.js";
import Usuario from "../models/Usuarios.js";

export const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Inicia Sesion",
  });
};

export const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "Crear Cuenta",
    csrfToken: req.csrfToken(),
  });
};

export const registrarUsuario = async (req, res) => {
  //validando campos del formulario(enlasando a traves del name en el input)
  await check("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .run(req);

  await check("email").isEmail().withMessage("No es un email valido").run(req);
  await check("password")
    .isLength({ min: 6 })
    .withMessage("el password debe ser minimo de 6 caracteres")
    .run(req);

  await check("repetir_password")
    .equals(req.body.password)
    .withMessage("Los Passwords no son iguales")
    .run(req);

  let resultado = validationResult(req);
  //validando que no haya errores en el validationResult
  if (!resultado.isEmpty()) {
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  // si pasa la validadcion verficar email unico
  const existeUsuario = await Usuario.findOne({
    where: { email: req.body.email },
  });
  if (existeUsuario) {
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "El usuario ya esta registrado con ese email" }],
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  //agregar usuario
  // const usuario = await Usuario.create(req.body);
  // res.json(usuario);
  const { nombre, email, password } = req.body;
  const usuario = await Usuario.create({
    nombre,
    email,
    password,
    token: generarId(),
  });

  //Envia mensaje de confirmacion
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  //Mostrar mensaje de confirmacion
  res.render("templates/mensaje", {
    pagina: "Cuenta creada correctamente",
    mensaje: "Hemos enviado un email de confirmacion presiona en el enlace",
  });
};

export const confirmarEmail = async (req, res) => {
  //extrar el valor de token que se mando por la url
  const { token } = req.params;

  //verficar si el token es valido
  const usuario = await Usuario.findOne({ where: { token } });

  if (!usuario) {
    return res.render("auth/confirmar-cuenta", {
      pagina: "Error al confirmar tu cuenta",
      mensaje: "Hubo un error al confirmar tu cuentam, Intenta nuevamente",
      error: true,
    });
  }
  //Confirmar la cuenta
  usuario.token = null;
  usuario.confirmado = true;
  usuario.save();

  res.render("auth/confirmar-cuenta", {
    pagina: "Cuenta confirmada",
    mensaje: "La cuenta se confirmo correctamente",
  });
};

export const formularioOlvidePassword = (req, res) => {
  res.render("auth/olvide-password", {
    pagina: "Recupe tu acceso a Bienes Raices",
  });
};
