const express = require("express");
const { User } = require("../models");
const router = express.Router();
const passport = require("passport");

router.post("/register", async (req, res, next) =>{
    const {nombre, apellido, documento, usuario, email, contraseña, telefono, direccion } = req.body

    const respuesta = await User.findOrCreate({
        where: {email},
        defaults:{ nombre, apellido, documento, usuario, email, contraseña, telefono, direccion}
    })

    if(respuesta[1]){
        console.log("Su usuario fue creado con exito.")
    }else{
        console.log("Usuario existente, probar con uno nuevo.")
    }

    res.send(respuesta)

    }
)

router.post('/login', passport.authenticate('user'), (req, res) =>  {
    
    res.send(req.user)
    
});

router.post('/stock', (req, res) =>  {
    res.send("asdasd")
});


module.exports = router;