const express = require("express");
const { User, Productos, CartItem, Inventario, Interaccion } = require("../models");

const router = express.Router();
const passport = require("passport");


router.post("/register", async (req, res, next) => {
  const {
    nombre,
    apellido,
    documento,
    usuario,
    email,
    contraseña,
    telefono,
    direccion,
  } = req.body;

  const respuesta = await User.findOrCreate({
    where: { email },
    defaults: {
      nombre,
      apellido,
      documento,
      usuario,
      email,
      contraseña,
      telefono,
      direccion,
    },
  });

  if (respuesta[1]) {
    console.log("Su usuario fue creado con exito.");
  } else {
    console.log("Usuario existente, probar con uno nuevo.");
  }

  res.send(respuesta);
});

router.post("/login", passport.authenticate("user"), (req, res) => {
  res.send(req.user);
});


router.post("/:id/addToCart", async (req, res) => {
  const producto = await Productos.findByPk(req.params.id,{
    include:{
      model:Inventario,
      where:{
        talle: req.body.talle
      }
    }
  })

  if (!producto) return res.send("No hay stock")

  const {inventarios} = producto
  const cantidadDisponible = inventarios[0].dataValues.stock

  if(cantidadDisponible >= req.body.cantidad){
    const {price} = producto
    const costo = price * req.body.cantidad

    const respuesta = await CartItem.findOrCreate({
      where:{
        productoId: req.params.id,
        talle: req.body.talle
      },defaults:{
      cantidad: req.body.cantidad,
      costo: costo,
      productoId: req.params.id,
      userId: req.body.user,
      talle: req.body.talle
    }})

    respuesta[1] ? res.send("Cart Item se añadio correctamente."): res.send("El producto ya fue añadido al carrito.")
  }else{
    res.send("No hay stock suficiente.")
  }
  
});

router.get("/:user/carrito", async (req,res) =>{
  const allItems = await CartItem.findAll({
    where:{
      userId: req.params.user
    }
  })
  res.send(allItems)

})

router.put("/:user/carrito/:id", async (req,res) =>{

  const producto = await Productos.findByPk(req.params.id,{
    include:{
      model:Inventario,
      where:{
        talle: req.body.talle
      }
    }
  })

  const {inventarios} = producto
  const cantidadDisponible = inventarios[0].dataValues.stock

  if(cantidadDisponible >= req.body.cantidad){
    const item = await CartItem.findOne({
    where:{
      userId: req.params.user,
      productoId: req.params.id,
      talle: req.body.talle
    }
  })
  await item.update({cantidad: req.body.cantidad})
  await item.save()
  res.sendStatus(200)
  }else{
    res.send("No hay stock suficiente")
  }
  
  



  

})

router.delete("/:user/carrito/:id", async (req,res) =>{
  await CartItem.destroy({
    where:{
      userId: req.params.user,
      productoId: req.params.id
    }
  })

  res.send("El producto se elimino del carrito")

})

router.post("/:user/:id/review", async (req, res) => {

  const [interaccion, created] = await Interaccion.findOrCreate({
    where: { 
      userId: req.params.user ,
      productoId: req.params.id
    },
    defaults: {
      rating: req.body.rating,
      comentario: req.body.comentario,
      userId: req.params.user,
      productoId: req.params.id
    }
  })
    
    if (created) {
      res.send("Gracias por dejar tu opinión.");
    } else {
      res.send("Ya dejaste una opinión te lo agradecemos tambien.");
    }
   
})

router.delete("/:user/:id/review", async (req, res) => {

  Interaccion.destroy({
    where: { 
      userId: req.params.user ,
      productoId: req.params.id
  }})
  .then(()=>res.send("Eliminaste tu comentario, deja tu opinion cuando quieras."))
  
   
})


module.exports = router;


