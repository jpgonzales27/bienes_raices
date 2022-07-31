// const express = require("express");  common js
import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js";
//CREAR LA APP
const app = express();

//Habilitar Pug
app.set("view engine", "pug");
app.set("viewes", "./views");

//Carpeta publica
app.use(express.static("public"));

//Routing
app.use("/auth", usuarioRoutes);

//definir un puerto y arrancar el proyecto
const port = 3000;
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
