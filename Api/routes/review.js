const express = require("express");

const {
  Productos,
  Interaccion,
  User,
} = require("../models");
const { Auth } = require("../controllers/middleware/auth");
const router = express.Router();

// Obtener las reviews de un producto

router.get("/:id", async (req, res) => {
  try {
    const review = await Productos.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Interaccion,
      },

      include: [
        {
          model: Interaccion,
          include: [{
            model:User,
            attributes:["usuario"]
           
          
          }],
          
        }
    ]
      

    });

    res.send(review.interaccions);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Postear una reaccion

router.post("/:id", Auth, async (req, res) => {
  try {
    const [interaccion, created] = await Interaccion.findOrCreate({
      where: {
        userId: req.user.id,
        productoId: req.params.id,
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
  } catch (error) {
    res.send(error);
  }
});

// Eliminar una reaccion

router.delete("/:id", Auth, async (req, res) => {
  Interaccion.destroy({
    where: {
      userId: req.user.id,
      productoId: req.params.id,
    },
  }).then(() =>
    res.send("Eliminaste tu comentario, deja tu opinion cuando quieras.")
  );
});

module.exports = router;
