// falta el Auth de Admin
const express = require("express");
const {Categoria} = require("../models");
const { AuthAdmin } = require("../controllers/middleware/auth");
const router = express.Router();


//Agregar una categoria, si ya existe no lo permite


router.post("/agregar",AuthAdmin, async (req, res) => {
    try {
      const [categoria, created] = await Categoria.findOrCreate({
        where: { cat: req.body.categoria },
        defaults: {
          cat: req.body.categoria,
        },
      });
  
      if (created) {
        res.send("Categoria creada");
      } else {
        res.send("No se pudo crear la categorias");
      }
    } catch (error) {
      res.send(error);
    }
  });
  
  // Recupera todas las categorias que hay

  router.get("/", AuthAdmin, async (req, res) => {
    try {
      const categorias = await Categoria.findAll();
      res.send(categorias);
    } catch (error) {
      res.send(error);
    }
  });
  
  // ELimnina de la base de datos la categoria seleccionada 




  router.delete("/",AuthAdmin, async (req, res) => {
    try {
      const categoria = await Categoria.destroy({
        where: {
          cat: req.body.categoria,
        },
      });
  
      res.sendStatus(301);
    } catch (error) {
      res.send(error);
    }
  });
  
  // Actualiza la categoria seleccionada


  router.put("/",AuthAdmin, async (req, res) => {
    try {
      const categoria = await Categoria.findOne({
        where: { cat: req.body.categoria },
      });
  
      categoria.cat = req.body.newCategoria;
  
      await categoria.update();
      await categoria.save();
  
      res.send(categoria);
    } catch (error) {
      res.send(error);
    }
  });

  module.exports = router;