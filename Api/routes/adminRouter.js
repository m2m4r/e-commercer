const express = require("express");
const {User} = require("../models");
const catAdmin = require("./categoriaAdmin")
const prodAdmin = require("./productoAdmin")
const ordenCompra = require("./productoAdmin")
const userAdmin = require("./userAdmin")


const { AuthAdmin } = require("../controllers/middleware/auth"); //middleware para comprobar que el usuario logeado sea admin

const router = express.Router();


router.use("/categorias",catAdmin)
router.use("/productos",prodAdmin)
router.use("/ordenesDeCompra",ordenCompra)
router.use("/usuarios",userAdmin)

router.put('/darAdmin/:id', AuthAdmin, async (req, res) => {
  await User.update({ permiso: 'admin' }, { where: { id: req.params.id } })
  res.status(201).send('Usuario promovido a administrador.')
})

router.put('/sacarAdmin/:id',AuthAdmin, async (req, res) => {
  await User.update({ permiso: 'user' }, { where: { id: req.params.id } })
  res.status(201).send('Usuario revocado del permiso a administrador.')
})

// falta el Auth de Admin


module.exports= router