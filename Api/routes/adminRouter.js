const express = require("express");
const {
  User,
  CartItem,
  Interaccion,
  Productos,
  Inventario,
  Categoria,
  CatPro,
  DetalleCompra
} = require("../models");

const nodemailer = require("nodemailer");

const { AuthAdmin } = require("../controllers/middleware/auth");

const router = express.Router();

// falta el Auth de Admin
router.put('/darAdmin/:id', async (req, res) => {
  await User.update({ permiso: 'admin' }, { where: { id: req.params.id } })
  res.status(201).send('Usuario promovido a administrador.')
})

// falta el Auth de Admin
router.put('/sacarAdmin/:id', async (req, res) => {
  await User.update({ permiso: 'user' }, { where: { id: req.params.id } })
  res.status(201).send('Usuario revocado del permiso a administrador.')
})

// falta el Auth de Admin
router.delete('/usuario/:id', async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.send("Usuario eliminado");
  } catch (error) {
    res.send(error);
  }
})

// falta el Auth de Admin
router.get("/usuarios", async (req, res) => {
  const usuarios = await User.findAll()
  res.send(usuarios);
})

router.post("/productos/nuevo", async (req, res) => {
  let obj = {};
  const producto = await Productos.create({
    modelo: req.body.modelo,
    price: req.body.price,
    marca: req.body.marca,
    image_url: req.body.image_url,
    descripcion: req.body.descripcion,
  });

  const agregarCategorias = req.body.categorias.map((categoria) => {
    return {
      categoriaId: categoria,
      productoId: producto.id,
    };
  });

  CatPro.bulkCreate(agregarCategorias);

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
      return Productos.update(req.body, { where: { id: productos.id } });
    })
    .then((prodModif) => console.log(prodModif));

  res.send("modificado");
});

// Ingresar o modificar el inventario
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
        {
          model: Categoria,
          attributes: ["cat"],
        },
      ],
      order: [
        [Inventario, 'talle', 'ASC']]
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
        order: [
          [Inventario, 'talle', 'ASC']]
      },

      
    );
    res.send(productos);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/productos/:id", async (req, res) => {
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

// falta el Auth de Admin
router.post("/categorias/agregar", async (req, res) => {
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

// falta el Auth de Admin
router.get("/categorias", async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.send(categorias);
  } catch (error) {
    res.send(error);
  }
});

// falta el Auth de Admin
router.delete("/categorias", async (req, res) => {
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

// falta el Auth de Admin
router.put("/categorias", async (req, res) => {
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


router.get("/ordenesDeCompra", (req, res)=>{
  DetalleCompra.findAll()
  .then(todos => res.send(todos))

})

router.get("/ordenesDeCompraPendientes", (req, res)=>{
  DetalleCompra.findAll({
    where:{
      estado_compra:"pendiente"
    }
  })
  .then(todos => res.send(todos))

})


router.put("/ordenesDeCompraPendientes/:id", async (req, res)=>{
  let compra = await DetalleCompra.findByPk(req.params.id)
  await compra.update({estado_compra:req.body.nuevo_estado})
  await compra.save()

  const Transporter = await nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
       auth: {
           user: "plataformasneakers@gmail.com",
           pass: "mikzmknpflldwbae"
       }
  })

  await Transporter.sendMail({
    from: `"Tu compra fue ${req.body.nuevo_estado}!" <plataformasneakers@gmail.com>`,
    to: compra.datos_contacto.email,
    subject: `Tu compra fue ${req.body.nuevo_estado}!`,
    html: (req.body.nuevo_estado === "aceptada")?(
        '<b>Se procesó tu pago correctamente.</b>'
      ):(
        "<b>Tu pago fue rechazado.</b>"
      )
  })

  res.send("Cambio en el estado efectuado correctamente")

})

module.exports = router;
