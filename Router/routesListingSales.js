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
    const listingSales = await register.insertMany(body);
 
    if (listingSales){
    res.status(200).json({
        "message" : 'Created sales',
        listingSales
    });
    }else{
        res.status(404).send("Sales not created");
    }
})

router.get('/insert', async (req, res) => {
    res.status(200).render('../View/ventasNew')
})

router.post('/insert/new', async (req, res) =>{
    const cliente = parseInt(req.body.cliente);
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const producto = req.body.producto;
    const total = req.body.total;
    
    const listingSales = await register.regist(cliente, nombre, apellido, producto, total);

    if (listingSales){
        res.status(200).redirect('/ventas')
    }else{
        res.status(404).send('Record not added')
    }
})

// READ

// find()
router.get('/', async (req, res) => { 
    const listingSales = await search.find();
    
    if(listingSales){
    res.status(200).render('../View/ventas', {title:listingSales})
    }else{
        res.status(404).send("Collection not found");
    }
})

// findSkiLi()
router.get('/resultado', async (req, res) => {
    const listingSales = await search.findSkiLi();

    if (listingSales){
    res.status(200).render('../View/ventas', {title:listingSales})
    }else{
        res.status(404).send("Collection not found");
   }
})

// findOne()
router.post('/searching/', async (req, res) => { 
    const id = req.body.id;
    const listingSales = await search.findOne({id});
    
    if (listingSales){
    res.status(200).render('../View/ventasFindOne', {title:listingSales})
    }else{
        res.status(404).send("Collection not found");
   }
})

// findOne()
router.get('/update/:id', async (req, res) => { 
    const id = req.params.id;
    const listingSales = await search.findOne({id});
    
    if (listingSales){
    res.status(200).render('../View/ventasActualizar', {title:listingSales})
    }else{
        res.status(404).send("Collection not found");
   }
})

// UPDATE

// updateOne()
router.post('/update/set/:id', async (req, res) => { 
    const id = req.params.id;
    const cliente = parseInt(req.body.cliente);
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const producto = req.body.producto;
    const total = req.body.total;
    const listingSales = await upda.updateOne(id, cliente, nombre, apellido, producto, total);
    
    if (listingSales){
        res.status(200).redirect('/ventas')

   }else{
        res.status(404).send("Sale not update");
   }
})

// updateMany()
router.patch('/', async (req, res) => { 
    const listing_producto = req.body.producto;
    const listingSales = await upda.updateMany(listing_producto);

    if (listingSales){
        res.status(200).json({
        "message": 'Update sale',
        listingSales
    });

   }else{
        res.status(404).send("Sale not update");
   }
})

// DELETE

// deleteOne()
router.get('/eliminar/:id', async (req, res) => { 
    const id = req.params.id;
    const listingSales = erase.deleteOne({id});
   
    if (listingSales){
        res.status(200).redirect('/ventas')

   }else{
        res.status(404).send("Sale not deleted");

   }
})

// deleteMany()
router.delete('/', async (req, res) => { 
    const body = req.body;
    const listingSales = erase.deleteMany(body);

    if(listingSales){
    res.status(200).json({
        "message": 'Deleted sales',
        listingSales
    });

   }else{
        res.status(404).send("Sales not deleted");
    }
})


module.exports = router;