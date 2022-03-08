const express = require("express");
const { Admin } = require("../models");
const router = express.Router();
const passport = require("passport");
const S = require("sequelize");

router.post("/register", async (req, res, next) =>{
    const {nombre, apellido, role, email, contraseña } = req.body

    const respuesta = await Admin.findOrCreate({
        where: {email},
        defaults:{ nombre, apellido, role, email, contraseña }
    })

    if(respuesta[1]){
        console.log("Su usuario fue creado con exito.")
    }else{
        console.log("Usuario existente, probar con uno nuevo.")
    }

    res.send(respuesta)

    }
)

router.post('/login', passport.authenticate('admin'), (req, res) =>  {
    res.send(req.admin);
});


module.exports = router;