const express=require('express');
const {MongoClient, ObjectId} = require('mongodb')
const Router=express.Router();
const bodyParser=require('body-parser');
require('dotenv').config();

const Usuarios = require('../Service/Usuario/UsuariosFind');
const UsuariosInsertar=require('../Service/Usuario/UsuarioInsert')
const UsuariosActualizar=require('../Service/Usuario/UsuarioUpdate')
const UsuariosDelete=require('../Service/Usuario/UsuarioDelete')

Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({extended: true}));
Router.use(express.json());
const uri=process.env.URI;


const Usuarios1 = new Usuarios();
const insertar=new UsuariosInsertar();
const actualizar=new UsuariosActualizar();
const eliminar=new UsuariosDelete();

Router.get('/', async(req, res)=>{

   const result=await Usuarios1.find();
    if(result){
        res.send(result)
       }else{
        res.send('No se encotro nada')
       }
})

//Listar
Router.get('/:id', async(req, res)=>{
    const id=req.params.id;

    const result=await Usuarios1.findOne({id});

    if(result){
        res.status(200).send(result)
      }else{
       res.status(404).send('No se encotro nada')
      }
});       


//Insertar
Router.post('/', async(req, res)=>{
    const body=req.body;
    const result= await insertar.insertMany(body);
   
    if(result){
        res.status(200).json({
           message: 'Se creo la pelicula',
           result,
       
        });
      }else{
       res.status(404).send('No se agrego la pelicula')
      }
});


//Update
Router.patch('/:id', async (req, res)=>{
    const id = req.params.id;
    const body = req.body.body;
    const result= await actualizar.updateOne(id,body);

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

    const result=await actualizar.updateMany(body);
    if(result){
        res.status(200).json({
            message: 'Se actualizo la pelicula',
            result,
            //data: body
        });
    }else{
        res.status(400).send("No se actualizo la pelicula");
    }
})


// DELETE ONE

Router.delete('/:id', async (req, res)=>{
    const id = req.params.id;
    const result= await eliminar.deleteOne(id);
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
    const result = await eliminar.deleteMany(body);
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