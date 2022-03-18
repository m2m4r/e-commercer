const express = require("express");
const {Productos,Inventario,Categoria,CatPro} = require("../models");

const { AuthAdmin } = require("../controllers/middleware/auth");

const router = express.Router();



//Agregar un producto nuevo a la base de datos

router.post("/nuevo", AuthAdmin, async (req, res) => {

    const producto = await Productos.create({
      modelo: req.body.modelo,
      price: req.body.price,
      marca: req.body.marca,
      image_url: req.body.image_url,
      descripcion: req.body.descripcion,
    });
  
    let agregarCategorias;
    if(!!req.body.categorias.length){
    agregarCategorias = req.body.categorias.map((categoria) => {
      return {
        categoriaId: categoria,
        productoId: producto.id,
      };
    })
    CatPro.bulkCreate(agregarCategorias);
    };
  
  
    res.send("creado o modificado");

  });


  //Actualiza un producto 
  
  router.post("/:id/actualizar", AuthAdmin, async (req, res) => {
  
    Productos.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((res) => res.dataValues)
      .then((productos) => {
        return Productos.update(req.body, { where: { id: productos.id } });
      })
      .then((prodModif) => console.log(prodModif));
  
    res.send("modificado");
  });

  
  // Ingresar o modificar el inventario

  router.post("/:id/stock", AuthAdmin, async (req, res) => {
    try {
      const [producto, created] = await Inventario.findOrCreate({
        where: { product_id: req.params.id, talle: req.body.talle },
        defaults: {
          talle: req.body.talle,
          stock: req.body.stock,
        },
      });
      if (created) {
        res.send("inventario creado");
      } else {
        producto.stock = req.body.stock;
        producto.save();
        res.send("stock modificado");
      }
    } catch (error) {
      res.send(error);
    }
  });

  //Trae a todos los productos


  
  router.get("/", async (req, res) => {
    try {
      const productos = await Productos.findAll({
        order: [
          ['id', 'ASC']],
        include: [
          {
            model: Inventario,
  
          },
          {
            model: Categoria,
            attributes: ["cat"],
          },

        ],
        
      });
      res.send(productos);
    } catch (error) {
      res.send(error);
    }
  });

  //Devuelve stock de un producto
  
  router.get("/:id/stock",AuthAdmin ,async (req, res) => {
    try {
      const productos = await Inventario.findAll(
        {
          where: {
            product_id: req.params.id,
          },
        },
        {
          include: [
            {
              model: Inventario,
            },
          ],
          order: [
            [Inventario, 'talle', 'ASC']]
        },
  
        
      );
      res.send(productos);
    } catch (error) {
      res.send(error);
    }
  });

  //Borrar producto en tabla producto e inventario
  
  router.delete("/:id", AuthAdmin, async (req, res) => {
    try {
      const productos = await Productos.destroy(
        { where: { id: req.params.id } },
        {
          include: [
            {
              model: Inventario,
            },
          ],
        }
      );
      res.send("borrado");
    } catch (error) {
      res.send(error);
    }
  });


//trea todo el stock full

  router.get("/stock",AuthAdmin, async (req, res) => {
    try {
      const productos = await Inventario.findAll({
          order: [
            [Inventario, 'talle', 'ASC']]
        },
      );
      res.send(productos);
    } catch (error) {
      res.send(error);
    }
  });


  module.exports= router;