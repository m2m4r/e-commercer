const express = require("express");
const { User, Interaccion } = require("../models");

const { AuthAdmin } = require("../controllers/middleware/auth");

const router = express.Router();

// falta el Auth de Admin
router.delete("/:id", AuthAdmin, async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.send("Usuario eliminado");
  } catch (error) {
    res.send(error);
  }
});

// falta el Auth de Admin

router.get("/:id", async (req, res) => {
  try {
    const usuario = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Interaccion,
      },
    });

    res.send(usuario);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
