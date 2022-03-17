const express = require("express");
const {
  User,
  Productos,
  CartItem,
  Inventario,
  Interaccion,
  Categoria,
  CatPro,
  DetalleCompra,
} = require("../models");
const { Auth } = require("../controllers/middleware/auth");
const S = require("sequelize");
const router = express.Router();
const rutasProductos = require("./productos")
const rutasCarrito = require("./carrito")
const rutasReview = require("./review")
const passport = require("passport");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

router.use("/productos", rutasProductos)
router.use("/carrito", rutasCarrito)
router.use("/review", rutasReview)

// Registro local de un nuevo usuario

router.post("/register", async (req, res, next) => {
  try {
    const { email } = req.body;
    const respuesta = await User.findOrCreate({
      where: { email },
      defaults: req.body,
    });

    if (respuesta[1]) {
      console.log("Su usuario fue creado con exito.");
    } else {
      console.log("Usuario existente, probar con uno nuevo.");
    }
    res.send(respuesta);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login local de un nuevo usuario

router.post("/login", passport.authenticate("user"), (req, res) => {
  res.send(req.user);
});

// Primer paso de login con authenticator de google

router.get('/auth/google',passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

// Segundo paso de login con authenticator de google

router.get('/auth/google/callback', passport.authenticate( 'google', {
  successRedirect: 'http://localhost:3000/',
  failureRedirect: 'http://localhost:3000/login'
}));

// Editar perfil usuario

router.put("/edit", Auth, async (req, res) => {
  try {
    const usuarioActualizado = await User.update(req.body, {
      where: { id: req.user.id },
    });
    res.status(201).send(usuarioActualizado);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Chequeo de persistencia

router.get("/me", Auth, (req, res) => {
  res.send(req.user);
});

// Logout perfil conectado

router.post("/logout", (req, res) => {
  req.logOut();
  res.sendStatus(200);
});

router.get("/productos/:id", async (req, res) => {
  try {
    const producto = await Productos.findOne({ 
      where: { id: req.params.id }, 
      include: {
        model: Interaccion
      }});
    res.send(producto);
  } catch {
    res.sendStatus(404);
  }
});

// Añadir producto al carrito
router.post("/:id/addToCart", Auth, async (req, res) => {
  try {
    const producto = await Productos.findByPk(req.params.id, {
      include: {
        model: Inventario,
        where: {
          talle: req.body.talle,
        },
      },
    });
    if (!producto) {
      throw new Error("No hay stock");
    }

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

      if (respuesta[1]) {
        res.send("Cart Item se añadio correctamente.");
      } else {
        throw new Error("El item ya esta agregado al carrito");
      }
    } else {
      throw new Error("No hay stock suficiente");
    }
  } catch (error) {
    res.status(304).send(error);
  }
});

// Traer todas las categorias

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

// Finalizar compra

router.post("/finalizar_compra", Auth, async (req, res) => {
  const userAuth = process.env.MAIL;
  const passAuth = process.env.CONTRASEÑA;

  let Transporter = await nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: 'plataformasneakers@gmail.com',
      pass: 'mikzmknpflldwbae',
    },
  });

  const compraUsuario = await DetalleCompra.create({
    userId: req.user.id,
    productos_comprados: req.body.productos_comprados,
    precio_final: req.body.precio_final,
    forma_entrega: req.body.forma_entrega,
    medio_de_pago: req.body.medio_de_pago,
    datos_contacto: req.body.datos_contacto,
  });

  await Transporter.sendMail({
    from: `"Compra registrada!" <${process.env.MAIL}>`, // sender address
    to: req.user.email, // list of receivers
    subject: "Compra registrada! ✔", // Subject line
    html: `
    <b> Tu compra fue realizada con éxito, a continuación te brindamos un detalle de la misma!
    Mediante el número de seguimiento podrás consultar el estado de tu compra.
    Muchas gracias por comprar en Plataforma Sneakers.</b>
    <table>
      <caption><strong>Tu compra:</strong></caption>
      <tbody>
        <tr>
          <td>Número de seguimiento:</td>
          <td>${compraUsuario.dataValues.id}</td>
        </tr>
        <tr>
          <td>Resumen compra:</td>
        </tr>
        ${compraUsuario.dataValues.productos_comprados.map((producto) => {
          return `
                <tr>    
                  <td>Modelo:</td>
                  <td>${producto.modelo}</td>
                </tr>
                `;
        })}
        <tr>
          <td>Costo Total:</td>
          <td>$${compraUsuario.dataValues.precio_final}</td>
        </tr>
        <tr>
        <td>Estado de la compra:</td>
        <td>${
          compraUsuario.dataValues.estado_compra
        }. Te enviaremos un mail cuando hayamos procesado tu pago.</td>
      </tr>
      </tbody>
    </table>
    `, // html body
  });

  CartItem.destroy({
    where: {
      userId: req.user.id,
    },
  });

  res.send(
    "Tu compra fue realizada con éxito, recibiras un email con información detallada al respecto."
  );
});

// Obtener historial de compras

router.get("/detalleCompras", Auth, async (req, res) => {
  try {
    const historial = await DetalleCompra.findAll({
      where: {
        userId: req.user.id,
      },
    });

    res.send(historial);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
