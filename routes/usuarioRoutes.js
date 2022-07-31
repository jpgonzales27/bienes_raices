import express from "express";
import {
  formularioLogin,
  formularioOlvidePassword,
  formularioRegistro,
} from "../controllers/usuarioController.js";

const router = express.Router();

router.get("/login", formularioLogin);
router.get("/registro", formularioRegistro);
router.get("/olvide-password", formularioOlvidePassword);

// router.get("/", function (req, res) {
//   res.send("Hola mundo de express");
// });

// router.get("/json", (req, res) => {
//   res.json({ message: "respuesta como json" });
// });

// router
//   .route("/")
//   .get(function (req, res) {
//     res.json({ message: "hola express respuesta GET" });
//   })
//   .post(function (req, res) {
//     res.json({ message: "hola express respuesta POST" });
//   });

export default router;
