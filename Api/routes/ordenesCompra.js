
const express = require("express");
const {DetalleCompra} = require("../models");
const { AuthAdmin } = require("../controllers/middleware/auth");
const nodemailer = require("nodemailer");
const router = express.Router();


//Devuelve todas las ordenes de compras de todos los usuarios

router.get("/",AuthAdmin, (req, res)=>{
    DetalleCompra.findAll()
    .then(todos => res.send(todos))
  
  })
  
  router.get("/pendientes",AuthAdmin, (req, res)=>{
    DetalleCompra.findAll({
      where:{
        estado_compra:"pendiente"
      }
    })
    .then(todos => res.send(todos))
  
  })

  //Cambia el estado de la compra y envia mail al usuario informando de la sitaucion junto con el detalle de la compra
  
  router.put("/pendientes/:id",AuthAdmin, async (req, res)=>{
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
  

  module.exports= router;