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

// CREAR E INSERTAR MUCHOS DATOS EN LA COLECCIÓN

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

router.get('/insert', async (req, res) => {
    res.status(200).render('../View/detallesNew')
})

router.post('/insert/new', async (req, res) =>{
    const pago = req.body.pago;
    const detalle = req.body.detalle;
    const subtotal = parseInt(req.body.subtotal);
    const iva = parseInt(req.body.iva);

    const collection2 = await register.regist(pago, detalle, subtotal, iva);

    if (collection2){
        res.status(200).redirect('/detalles')
    }else{
        res.status(404).send('Record not added')
    }
})

// READ

// BUSCAR Y MOSTRAR TODO LO QUE CONTIENE LA COLECCIÓN

// find()
router.get('/', async (req, res) => { 
    const collection2 = await search.find();
    
    if(collection2){
    res.status(200).render('../View/detalles', {title:collection2})
    
    }else{
        res.status(404).send("Collection not found");
    }
})

// BUSCAR Y MOSTRAR UN ELEMENTO DE LA COLECCIÓN

// findOne()
router.post('/searching/', async (req, res) => { 
    const id = req.body.id;
    const collection2 = await search.findOne({id});
    
    if(collection2){
    res.status(200).render('../View/detallesFindOne', {title:collection2})
    
    }else{
        res.status(404).send("Collection not found");
    }
})


// AGGREGATE 

// LOOKUP

router.get('/look', async (req, res) => { 
    const collection2 = await search.lookup();
    
    if(collection2){
    res.status(200).render('../View/detallesLookup' , {title:collection2});

    }else{
        res.status(404).send("Collection not found");
    }
})

// UNWIND

router.get('/unwi', async (req, res) => { 
    const collection2 = await search.unw();
    
    if(collection2){
    res.status(200).send(collection2)

    }else{
        res.status(404).send("Collection not found");
    }
})

// BUSCAR Y MOSTRAR SOLO CIERTOS ELEMENTOS DE LA COLECCIÓN POR MEDIO DE UN SKIP, LIMIT Y UN SORT

// findSkiLi()
router.get('/resultado', async (req, res) => { 
    const collection2 = await search.findSkiLi();
    
    if(collection2){
    res.status(200).render('../View/detalles', {title:collection2})
    
    }else{
        res.status(404).send("Collection not found");
    }
})

// ENVÍA DIRECTO AL FORMULARIO DE ACTUALIZACIÓN

// findOne()
router.get('/update/:id', async (req, res) => { 
    const id = req.params.id;
    const collection2 = await search.findOne({id});
    
    if (collection2){
    res.status(200).render('../View/detallesActualizar', {title:collection2})
    
    }else{
        res.status(404).send("Collection not found");
   }
})

// UPDATE

// ACTUALIZAR UN ELEMENTO DE LA COLECCIÓN POR MEDIO DEL ID

// updateOne()
router.post('/update/set/:id', async (req, res) => { 
    const id = req.params.id;
    const pago = req.body.pago;
    const detalle = req.body.detalle;
    const subtotal = parseInt(req.body.subtotal);
    const iva = parseInt(req.body.iva);
    const collection2 = await upda.updateOne(id, pago, detalle, subtotal, iva);
    
    if (collection2){
    res.status(200).redirect('/detalles')

    }else{
        res.status(404).send("Sale not update");
    }
})

// ACTUALIZAR TODA LA LISTA POR MEDIO DE UN PARAMETRO, EN ESTE CASO IVA

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

// ELIMINAR UN ELEMENTO DE LA COLECCIÓN POR MEDIO DEL ID

// deleteOne()
router.get('/eliminar/:id', async (req, res) => { 
    const id = req.params.id;
    const collection2 = erase.deleteOne({id});
   
    if (collection2){
    res.status(200).redirect('/detalles')

    }else{
    res.status(404).send("Sale not deleted");

    }
})

// ELIMINAR TODA LA COLECCIÓN

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