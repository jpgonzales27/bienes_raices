import { check, validationResult } from "express-validator";
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
  await Usuario.create({ nombre, email, password, token: 123 });
};

export const formularioOlvidePassword = (req, res) => {
  res.render("auth/olvide-password", {
    pagina: "Recupe tu acceso a Bienes Raices",
  });
};
