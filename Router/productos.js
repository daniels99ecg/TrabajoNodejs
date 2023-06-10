const express=require('express');
const {MongoClient, ObjectId} = require('mongodb')
const Router=express.Router();
const bodyParser=require('body-parser');
require('dotenv').config();

const productosFind=require('../Service/productos/productosFind');

const productosInsertar=require('../Service/productos/productosInsert');

const productosActualizar=require('../Service/productos/productosUpdate');

const productosEliminar=require('../Service/productos/productoDelete');

const uri=process.env.URI;

Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({extended: true}));
Router.use(express.json());

const listar = new productosFind();
const insertar=new productosInsertar();
const actualizar=new productosActualizar();
const eliminar=new productosEliminar();

Router.get('/', async(req, res)=>{

    const result = await listar.find();
    if(result){
        res.send(result)
       }else{
        res.send('No se encotro nada')
       }
})


Router.get('/:id', async(req, res)=>{
    const id=req.params.id;
    const result= await listar.findOne({id})
    if(result){
        res.status(200).send(result)
      }else{
       res.status(404).send('No se encotro nada')
      }
});



Router.post('/', async(req, res)=>{
    const body=req.body;

    const result = await insertar.findOne(body)
       if(result){
         res.status(200).json({
            message: 'Se creo la pelicula',
            result,
        
         });
       }else{
        res.status(404).send('No se agrego la pelicula')
       }

    
});



Router.patch('/:id', async (req, res)=>{
    const id=req.params.id;
    const productos_nombre = req.body.nombre_producto
    const result = await actualizar.updateOne(id,productos_nombre);
        if(result){
            res.status(200).json({
                message: 'Se actualizo la pelicula',
                result,
                //data: body
            });
        }else{
            res.status(404).send("No se actualizo la pelicula");
        }
    
})
//UPDATE MANY
Router.put('/', async (req, res)=>{
    const productos_detalle = req.body.detalle;
    const result = await actualizar.updateMany(productos_detalle)

        if(result){
            res.status(200).json({
                message: 'Se actualizo la pelicula',
                result,
                //data: body
            });
        }else{
            res.status(404).send("No se actualizo la pelicula");
        }
    
})


// DELETE ONE
Router.delete('/:id', async (req, res)=>{
    const id = req.params.id;
  
    const result = await eliminar.deleteOne(id);
        if(result){
            res.status(200).json({
                message: 'Se borro la pelicula',
                result,
                //data: body
            });
        }else{
            res.status(404).send("No se actualizo la pelicula");
        }
 
})
//DELETE MANY 
Router.delete('/', async (req, res)=>{

   const body=req.body;
    
        const result= await eliminar.deleteMany(body);
        if(result){
            res.status(200).json({
                message: 'Se borro el documento',
                result,
                //data: body
            });
        }else{
            res.status(404).send("No se elimino el documento");
        }

})


module.exports=Router;