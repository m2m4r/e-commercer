const express = require("express");
const {User} = require("../models");

const { AuthAdmin } = require("../controllers/middleware/auth");

const router = express.Router();



// falta el Auth de Admin
router.delete('/:id',AuthAdmin, async (req, res) => {
    try {
      await User.destroy({ where: { id: req.params.id } });
      res.send("Usuario eliminado");
    } catch (error) {
      res.send(error);
    }
  })
  
  // falta el Auth de Admin
  router.get("/", AuthAdmin,async (req, res) => {
    const usuarios = await User.findAll()
    res.send(usuarios);
  })



  module.exports= router