const express = require("express");
const {
  Productos,
  Inventario,
  Interaccion,
  Categoria,
  CatPro
} = require("../models");
const S = require("sequelize");
const router = express.Router();

// Traer todos los productos

router.get("/", async (req, res) => {
  try {
    const productos = await Productos.findAll({
      include: [
        {
          model: Inventario,
        },
        {
          model: Categoria,
          through: {
            attributes: ["cat"],
          },
        },{
          model: Interaccion
        }
      ]
    });
    res.send(productos);
  } catch (error) {
    res.send(error);
  }
});

// Traer un producto especifico

router.get("/:id", async (req, res) => {
  try {
    const producto = await Productos.findOne({
      where: {
        id: req.params.id 
      },
      include:{
        model: Interaccion
      }
    })
    res.send(producto);
  } catch {
    res.sendStatus(404);
  }
});

// Funcion pagination

router.get("/pages/:page", async (req, res) => {
  try {
    const page =
      req.params.page === "1" ? 0 : (Number(req.params.page) - 1) * 12;
    const productos = await Productos.findAll({
      include: [{ model: Categoria }, { model: Inventario }],
      offset: page,
      limit: 12,
    });
    res.send(productos);
  } catch (error) {
    res.send(error);
  }
});

// Buscar productos por query

router.post("/search", async (req, res) => {
  const query = req.query;
  let llave = Object.keys(query)[0];
  llave = llave.toLowerCase();

  try {
    const productos = await Productos.findAll({
      include: [
        {
          model: Categoria,
          as: "categorias",
        },
        {
          model: Inventario,
        },
      ],
      where: {
        [S.Op.or]: [
          {
              modelo: { 
                [S.Op.iLike]: query[llave]+"%",
              },
            },
            {
              marca: {
                [S.Op.iLike]: query[llave]+"%",
              },
            },
        ],
      },
    });

    res.send(productos);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;