const express = require("express");
const {User,DetalleCompra} = require("../models");
const catAdmin = require("./categoriaAdmin")
const prodAdmin = require("./productoAdmin")
const ordenCompra = require("./productoAdmin")
const nodemailer = require("nodemailer");

const { AuthAdmin } = require("../controllers/middleware/auth"); //middleware para comprobar que el usuario logeado sea admin

const router = express.Router();

router.use("/categorias",catAdmin)
router.use("/productos",prodAdmin)
router.use("/ordenesDeCompra",ordenCompra)


// Rutas para otorgar o rechazar el permiso de admin a usuarios registrados


router.put('/darAdmin/:id', AuthAdmin, async (req, res) => {
  await User.update({ permiso: 'admin' }, { where: { id: req.params.id } })
  res.status(201).send('Usuario promovido a administrador.')
})

router.put('/sacarAdmin/:id',AuthAdmin, async (req, res) => {
  await User.update({ permiso: 'user' }, { where: { id: req.params.id } })
  res.status(201).send('Usuario revocado del permiso a administrador.')
})




module.exports= router