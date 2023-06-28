const express = require('express');
const bodyparser = require ('body-parser');
const listingSearch3 = require('../Service/collection3/collection3Find');
const listingRegister3 = require('../Service/collection3/collection3Insert');
const listingUpda3 = require('../Service/collection3/collection3Update');
const listingErase3 = require('../Service/collection3/collection3Delete');

const router = express.Router();

const search = new listingSearch3();
const register = new listingRegister3();
const upda = new listingUpda3();
const erase = new listingErase3();

/**
 * CRUD , CREATE , READ , UPDTAE , DELETE
 */

// CREATE

// insertMany()
router.post('/', async (req, res) => { 
    const body = req.body;
    const collection3 = await register.insertMany(body);
 
    if (collection3){
    res.status(200).json({
        "message" : 'Created sales',
        collection3
    });
    }else{
        res.status(404).send("Sales not created");
    }
})

router.get('/insert', async (req, res) => {
    res.status(200).render('../View/estadoNew')
})

router.post('/insert/new', async (req, res) =>{
    const cantidad = parseInt(req.body.cantidad);
    const compra = req.body.compra;
    const opiniones = req.body.opiniones;
    const estado = req.body.estado;
    
    const collection3 = await register.regist(cantidad, compra, opiniones, estado);

    if (collection3){
        res.status(200).redirect('/estado')
    }else{
        res.status(404).send('Record not added')
    }
})

// READ

// find()
router.get('/', async (req, res) => { 
    const collection3 = await search.find();
    
    if(collection3){
    res.status(200).render('../View/estado', {title:collection3})
    
    }else{
        res.status(404).send("Collection not found");
    }
})

// findSkiLi()
router.get('/resultado', async (req, res) => { 
    const collection3 = await search.findSkiLi();
    
    if(collection3){
    res.status(200).render('../View/estado', {title:collection3})
    
    }else{
        res.status(404).send("Collection not found");
    }
})

// findOne()
router.post('/searching/', async (req, res) => { 
    const id = req.body.id;
    const collection3 = await search.findOne({id});
    
    if (collection3){
    res.status(200).render('../View/estadoFindOne', {title:collection3})
    
    }else{
        res.status(404).send("Collection not found");
   }
})

// findOne()
router.get('/update/:id', async (req, res) => { 
    const id = req.params.id;
    const collection3 = await search.findOne({id});
    
    if (collection3){
    res.status(200).render('../View/estadoActualizar', {title:collection3})
    
    }else{
        res.status(404).send("Collection not found");
   }
})

// UPDATE

// updateOne()
router.post('/update/set/:id', async (req, res) => { 
    const id = req.params.id;
    const compra = req.body.compra;
    const opiniones = req.body.opiniones;
    const cantidad = parseInt(req.body.cantidad);
    const estado = req.body.estado;
    const collection3 = await upda.updateOne(id, compra, opiniones, cantidad, estado);
    
    if (collection3){
        res.status(200).redirect('/estado')

   }else{
        res.status(404).send("Sale not update");
   }
})

// updateMany()
router.patch('/', async (req, res) => { 
    const cole3_estado = req.body.estado;
    const collection3 = await upda.updateMany(cole3_estado);

    if (collection3){
        res.status(200).json({
        "message": 'Update sale',
        collection3
    });

   }else{
        res.status(404).send("Sale not update");
   }
})

// DELETE

// deleteOne()
router.get('/eliminar/:id', async (req, res) => { 
    const id = req.params.id;
    const collection3 = erase.deleteOne({id});
   
    if (collection3){
    res.status(200).redirect('/estado')

   }else{
    res.status(404).send("Sale not deleted");

   }
})

// deleteMany()
router.delete('/', async (req, res) => { 
    const body = req.body;
    const collection3 = erase.deleteMany(body);

    if(collection3){
    res.status(200).json({
        "message": 'Deleted sales',
        collection3
    });

   }else{
        res.status(404).send("Sales not deleted");
    }
})

module.exports = router;