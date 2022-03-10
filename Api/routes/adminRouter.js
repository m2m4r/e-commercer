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
  const producto = await Productos.create(
    {
      modelo: req.body.modelo,
      price: req.body.price,
      image_url: req.body.image,
      marca: req.body.marca,
      descripcion: req.body.desc ,
      talles: [{ talle: req.body.talle, stock: req.body.stock }],
    },
    {
      include: [
        {
          model: Inventario,
          as: "talles",
        },
      ],
    }
  );

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

/* router.post("/productos/:id/stock", async (req, res) => {
    
   
    Productos.findOne({
    where: {
      id: req.params.id,
    },
  })
  .then((res)=>res.dataValues)
  .then(productos=>{
     

     return Productos.update(req.body,{where:{id: productos.id}})
    })
    .then((prodModif)=>console.log(prodModif))

  res.send("modificado");
}); */

router.get("/productos/", async (req, res) => {
  const productos = await Productos.findAll({
    include: [
      {
        model: Inventario,
        as: "talles",
      },
    ],
  });

  res.send(productos);
});

module.exports = router;
