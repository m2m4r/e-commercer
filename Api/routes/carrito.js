const express = require("express");
const {
  Productos,
  Inventario,
  CartItem
} = require("../models");
const { Auth } = require("../controllers/middleware/auth");
const router = express.Router();

// Obtener todos los productos del carrito

router.get("/", Auth, async (req, res) => {
  try {
    const allItems = await CartItem.findAll({
      where: {
        userId: req.user.id,
      },
      order: [["createdAt", "ASC"]],
    });
    res.send(allItems);
  } catch (error) {
    res.status(304).send(error);
  }
});

// Modificar cantidades de producto en carrito

router.put("/:id", Auth, async (req, res) => {
  try {
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

      const allItems = await CartItem.findAll({
        where: {
          userId: req.user.id,
        },
        order: [["createdAt", "ASC"]],
      });
      res.send(allItems);
    } else {
      res.sendStatus(304);
    }
  } catch (error) {
    res.send(error);
  }
});

// Eliminar producto del carrito

router.delete("/:id", Auth, async (req, res) => {
  try {
    await CartItem.destroy({
      where: {
        userId: req.user.id,
        id: req.params.id,
      },
    });

    const allItems = await CartItem.findAll({
      where: {
        userId: req.user.id,
      },
    });
    res.send(allItems);
  } catch (error) {
    res.status(400).send(error);
  }

});


module.exports = router;