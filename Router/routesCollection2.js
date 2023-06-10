const express = require('express');
const bodyparser = require ('body-parser');
const listingSearch2 = require('../Service/collection2/collection2Find');
const listingRegister2 = require('../Service/collection2/collection2Insert');
const listingUpda2 = require('../Service/collection2/collection2Update');
const listingErase2 = require('../Service/collection2/collection2Delete');

const router = express.Router();

const search = new listingSearch2();
const register = new listingRegister2();
const upda = new listingUpda2();
const erase = new listingErase2();

/**
 * CRUD , CREATE , READ , UPDTAE , DELETE
 */

// CREATE

// insertMany()
router.post('/', async (req, res) => { 
    const body = req.body;
    const collection2 = await register.insertMany(body);
 
    if (collection2){
    res.status(200).json({
        "message" : 'Created sales',
        collection2
    });
    }else{
        res.status(404).send("Sales not created");
    }
})

// READ

// find()
router.get('/', async (req, res) => { 
    const collection2 = await search.find();
    
    if(collection2){
    res.status(200).send({
        "message": 'Found collection',
        collection2
    });
    }else{
        res.status(404).send("Collection not found");
    }
})

// findOne()
router.get('/:id', async (req, res) => { 
    const id = req.params.id;
    const collection2 = await search.findOne({id});
    
    if (collection2){
    res.status(200).send({
        "message": 'Found collection',
        collection2
    });
    }else{
        res.status(404).send("Collection not found");
   }
})

// UPDATE

// updateOne()
router.patch('/:id', async (req, res) => { 
    const id = req.params.id;
    const cole2_detalle = req.body.detalle;
    const cole2_iva = req.body.iva;
    const collection2 = await upda.updateOne(id, cole2_detalle, cole2_iva);
    
    if (collection2){
        res.status(200).json({
        "message" : 'Sale update',
        collection2
    });

   }else{
        res.status(404).send("Sale not update");
   }
})

// updateMany()
router.patch('/', async (req, res) => { 
    const cole2_iva = req.body.iva;
    const collection2 = await upda.updateMany(cole2_iva);

    if (collection2){
        res.status(200).json({
        "message": 'Update sale',
        collection2
    });

   }else{
        res.status(404).send("Sale not update");
   }
})

// DELETE

// deleteOne()
router.delete('/:id', async (req, res) => { 
    const id = req.params.id;
    const collection2 = erase.deleteOne({id});
   
    if (collection2){
    res.status(200).json({
        "message" : 'Deleted sale',
        collection2
    });

   }else{
    res.status(404).send("Sale not deleted");

   }
})

// deleteMany()
router.delete('/', async (req, res) => { 
    const body = req.body;
    const collection2 = erase.deleteMany(body);

    if(collection2){
    res.status(200).json({
        "message": 'Deleted sales',
        collection2
    });

   }else{
        res.status(404).send("Sales not deleted");
    }
})


module.exports = router;