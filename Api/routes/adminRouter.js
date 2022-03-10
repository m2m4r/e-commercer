const express = require("express");
const {
  User,
  CartItem,
  Interaccion,
  Productos,
  Inventario,
} = require("../models");

const router = express.Router();

router.post("/productos/nuevo", async (req, res) => {
  const producto = await Productos.create({
    modelo: req.body.modelo,
    price: req.body.price,
    marca: req.body.marca,
    /*  image_url: req.body.image,
      descripcion: req.body.desc ,
      talles: [{ talle: req.body.talle, stock: req.body.stock }], */
  });

  res.send("creado o modificado");
});

router.post("/productos/:id/actualizar", async (req, res) => {
  console.log(req.body);

  Productos.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((res) => res.dataValues)
    .then((productos) => {
      console.log("estos es antes del update", productos);

      return Productos.update(req.body, { where: { id: productos.id } });
    })
    .then((prodModif) => console.log(prodModif));

  res.send("modificado");
});

router.post("/productos/:id/stock", async (req, res) => {
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

router.get("/productos", async (req, res) => {
  try {
    const productos = await Productos.findAll({
      include: [
        {
          model: Inventario,
        },
      ],
    });
    res.send(productos);
  } catch (error) {
    res.send(error);
  }
});

router.get("/productos/:id/stock", async (req, res) => {
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
      }
    );
    res.send(productos);
  } catch (error) {
    res.send(error);
  }
});


router.delete("/productos/:id", async (req, res) => {
  try {
    const productos = await Productos.destroy({where:{id:req.params.id}},{
      include: [
        {
          model: Inventario,
        },
      ],
    });
   res.send("borrado")
  } 
  catch (error) {
    res.send(error);
  }
});




module.exports = router;
