const express=require('express');
const router = express.Router();
const mongoose= require('mongoose');
let Person = require('../models/persons');



router.get('/gente', async (req, res)=>{
    const Persons = await Person.find({});
    res.render("index", {Persons});
});

router.get('/addPerson', (req, res)=>{
    res.render('addPerson');
});

router.post('/addPerson', (req,res)=>{
    const newPerson = Person({
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss
    });

    newPerson
    .save()
    .then((data)=>{res.redirect('/gente')})
    .catch((error)=>{res.json({message:error})});
});

router.get('/findById/:id',(req, res)=>{
    Person.findById(req.params.id)
    .then((myPerson)=>{res.render('personUpdate',{myPerson})})
    .catch((error)=>{res.json({message:error})});
});

//Buscar por Id y actualizar datos
router.post('/updatePerson', (req, res)=>{
    Person.findByIdAndUpdate(req.body.objId, 
        {
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipoSangre:req.body.tipoSangre,
        nss: req.body.nss
        })
        .then((data)=>{res.redirect('/gente')})
        .catch((error)=>{res.json({message:error})});
});

//Buscar por Id y borrar persona
router.get('/deletePerson/:id', (req, res)=>{
    Person.findByIdAndDelete(req.params.id)
    .then(()=>{res.redirect('/gente')})
    .catch((error)=>{res.json({message:error})});
})

//BUSCADOR
router.post('/find', (req, res)=>{
    Person.find({ nombre: { $regex: req.body.criterio, $options: "i"}})
    .then((Persons)=>{res.render('index',{Persons})})
    .catch((error)=>{res.json({message:error})});
});
module.exports=router;