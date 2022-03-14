const express = require("express");
const {
  User,
  Productos,
  CartItem,
  Inventario,
  Interaccion,
  Categoria,
  CatPro,
  DetalleCompra
} = require("../models");
const { Auth } = require("../controllers/middleware/auth");
const S = require("sequelize");
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

router.put("/edit", Auth, async (req, res) => {
  const usuarioActualizado = await User.update(req.body, { where: {id: req.user.id}, individualHooks: true})
  res.status(201).send(usuarioActualizado);
});

router.get("/me", Auth, (req, res) => {
  res.send(req.user);
});

router.post("/logout", (req, res) => {
  req.logOut();
  res.sendStatus(200);
});

router.post("/:id/addToCart", Auth, async (req, res) => {
  const producto = await Productos.findByPk(req.params.id, {
    include: {
      model: Inventario,
      where: {
        talle: req.body.talle,
      },
    },
  });

  if (!producto) return res.send("No hay stock");

  const { inventarios } = producto;
  const cantidadDisponible = inventarios[0].dataValues.stock;

  if (cantidadDisponible >= req.body.cantidad) {
    const { price } = producto;
    const costo = price * req.body.cantidad;

    const respuesta = await CartItem.findOrCreate({
      where: {
        productoId: req.params.id,
        talle: req.body.talle,
      },
      defaults: {
        cantidad: req.body.cantidad,
        costo: costo,
        productoId: req.params.id,
        userId: req.user.id,
        talle: req.body.talle,
      },
    });

    respuesta[1]
      ? res.send("Cart Item se añadio correctamente.")
      : res.send("El producto ya fue añadido al carrito.");
  } else {
    res.send("No hay stock suficiente.");
  }
});


router.get("/carrito", Auth, async (req,res) =>{
  const allItems = await CartItem.findAll({
    where:{
      userId: req.user.id
    }
  })
  res.send(allItems)

})

router.put("/carrito/:id", Auth, async (req,res) =>{
  const producto = await Productos.findByPk(req.params.id, {
    include: {
      model: Inventario,
      where: {
        talle: req.body.talle,
      },
    },
  });

  const { inventarios } = producto;
  const cantidadDisponible = inventarios[0].dataValues.stock;

  if (cantidadDisponible >= req.body.cantidad) {
    const item = await CartItem.findOne({
      where: {
        userId: req.user.id,
        productoId: req.params.id,
        talle: req.body.talle,
      },
    });
    await item.update({ cantidad: req.body.cantidad });
    await item.save();
    res.sendStatus(200);
  } else {
    res.send("No hay stock suficiente");
  }
});



router.delete("/carrito/:id", Auth, async (req,res) =>{
  await CartItem.destroy({
    where: {
      userId: req.user.id,
      productoId: req.params.id,
    },
  });

  res.send("El producto se elimino del carrito");
});


router.post("/:id/review", Auth, async (req, res) => {

    const [interaccion, created] = await Interaccion.findOrCreate({
    where: { 
      userId: req.user.id ,
      productoId: req.params.id
    },
    defaults: {
      rating: req.body.rating,
      comentario: req.body.comentario,
      userId: req.user.id,
      productoId: req.params.id,
    },
  });

  if (created) {
    res.send("Gracias por dejar tu opinión.");
  } else {
    res.send("Ya dejaste una opinión te lo agradecemos tambien.");
  }
});
  
router.delete("/:id/review", Auth, async (req, res) => {
  Interaccion.destroy({
    where: {
      userId: req.user.id,
      productoId: req.params.id,
    },
  }).then(() =>
    res.send("Eliminaste tu comentario, deja tu opinion cuando quieras.")
  );
});

router.get("/category", async (req, res) => {
  try {
    const productos = await Categoria.findAll({
      where: {
        cat: req.query.cat,
      },
      include: [
        {
          model: Productos,
        },
      ],
    });

    res.send(productos);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/search/producto", async (req, res) => {
  const query = req.query;
  const llave = Object.keys(query)[0]

  try {
    const productos = await Productos.findAll({
      where: {
        [S.Op.or] : [
          { modelo: {
          [S.Op.iLike]: query[llave] + "%"
        }},
        {categorias:{
          cat:{
            [S.Op.iLike]: query[llave] + "%"
          }
        }},
        {marca:{
          [S.Op.iLike]: query[llave] + "%"
        }}
        ]
      },
      include: [
        {
          model: Categoria,
        },
        {
          model: Inventario,
        }
      ]
    });

    res.send(productos);
  } catch (error) {
    res.status(500).send(error);
  }
});


// CONTINUAR

router.post("/finalizar_compra", async (req, res)=>{



  await DetalleCompra.create({
    userId : req.user.id,
    productos_comprados : req.body.productos_comprados,
    precio_final : req.body.precio_final,
    forma_entrega : req.body.forma_entrega,
    medio_de_pago: req.body.medio_de_pago,
    datos_contacto : req.body.datos_contacto
  })
  
  res.send()
})



module.exports = router;
