// const express = require("express");  common js
import express from "express";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import db from "./config/db.js";

//CREAR LA APP
const app = express();

//habilitar lectura de datos del formulario
app.use(express.urlencoded({ extended: true }));

//Habilitar cookie parser
app.use(cookieParser());

//Habilitar CSRF
app.use(csrf({ cookie: true }));

//Conexion a la base de datos
try {
  await db.authenticate();
  db.sync();
  console.log("Conexion a la base de datos");
} catch (error) {
  console.log(error);
}

//Habilitar Pug
app.set("view engine", "pug");
app.set("viewes", "./views");

//Carpeta publica
app.use(express.static("public"));

//Routing
app.use("/auth", usuarioRoutes);

//definir un puerto y arrancar el proyecto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
