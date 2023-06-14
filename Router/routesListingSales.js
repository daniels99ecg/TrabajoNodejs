const express = require('express');
const bodyparser = require ('body-parser');
const listingSearch = require('../Service/listingSales/listingFind');
const listingRegister = require('../Service/listingSales/listingInsert');
const listingUpda = require('../Service/listingSales/listingUpdate');
const listingErase = require('../Service/listingSales/listingDelete');

const router = express.Router();

const search = new listingSearch();
const register = new listingRegister();
const upda = new listingUpda();
const erase = new listingErase();

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

    // res.status(200).send({
    //     "message": 'Found collection',
    //     collection3
   
    // });
    res.status(200).render('../View/ventas', {title:collection3});


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
    const listing_nombre = req.body.nombre;
    const listing_apellido = req.body.apellido;
    const collection3 = await upda.updateOne(id, listing_nombre, listing_apellido);
    
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
    const listing_producto = req.body.producto;
    const collection3 = await upda.updateMany(listing_producto);

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