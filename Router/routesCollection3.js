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

// READ

// find()
router.get('/', async (req, res) => { 
    const collection3 = await search.find();
    
    if(collection3){
    res.status(200).send({
        "message": 'Found collection',
        collection3
    });
    }else{
        res.status(404).send("Collection not found");
    }
})

// findOne()
router.get('/:id', async (req, res) => { 
    const id = req.params.id;
    const collection3 = await search.findOne({id});
    
    if (collection3){
    res.status(200).send({
        "message": 'Found collection',
        collection3
    });
    }else{
        res.status(404).send("Collection not found");
   }
})

// UPDATE

// updateOne()
router.patch('/:id', async (req, res) => { 
    const id = req.params.id;
    const cole3_cantidad = req.body.cantidad;
    const cole3_estado = req.body.estado;
    const collection3 = await upda.updateOne(id, cole3_cantidad, cole3_estado);
    
    if (collection3){
        res.status(200).json({
        "message" : 'Sale update',
        collection3
    });

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
router.delete('/:id', async (req, res) => { 
    const id = req.params.id;
    const collection3 = erase.deleteOne({id});
   
    if (collection3){
    res.status(200).json({
        "message" : 'Deleted sale',
        collection3
    });

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