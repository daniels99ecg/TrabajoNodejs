const express=require('express');
const {MongoClient, ObjectId} = require('mongodb')
const Router=express.Router();
const bodyParser=require('body-parser');
require('dotenv').config();

const RolFind=require('../Service/Rol/RolFind');

const RolInsertar=require('../Service/Rol/RolInsert');

const RolActualizar=require('../Service/Rol/RolUpdate');

const RolEliminar=require('../Service/Rol/RolDelete');

const uri=process.env.URI;

Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({extended: true}));
Router.use(express.json());

const listar = new RolFind();
const insertar=new RolInsertar();
const actualizar=new RolActualizar();
const eliminar=new RolEliminar();

Router.get('/', async(req, res)=>{

    const result = await listar.find();
    if(result){
        res.render('../View/Rol', {title:result})
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
    const body = req.body;
    const result = await actualizar.updateOne(id, body);
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

    const body = req.body;

    const result = await actualizar.updateMany(body);
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
                message: 'Se borro la pelicula',
                result,
                //data: body
            });
        }else{
            res.status(404).send("No se actualizo la pelicula");
        }

})


module.exports=Router;