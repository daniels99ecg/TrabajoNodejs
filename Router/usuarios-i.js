const express=require('express');
const {MongoClient, ObjectId} = require('mongodb')
const Router=express.Router();
const bodyParser=require('body-parser');
require('dotenv').config();

const Usuarios = require('../Service/UsuariosFind');
const UsuariosInsertar=require('../Service/UsuarioInsert')

Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({extended: true}));
Router.use(express.json());
const uri=process.env.URI;


const Usuarios1 = new Usuarios();
const insertar=new UsuariosInsertar();

Router.get('/', async(req, res)=>{

   const result=await Usuarios1.find();
    if(result){
        res.send(result)
       }else{
        res.send('No se encotro nada')
       }
})


Router.get('/:id', async(req, res)=>{
    const id=req.params.id;

    const result=await Usuarios1.findOne({id});

    if(result){
        res.status(200).send(result)
      }else{
       res.status(404).send('No se encotro nada')
      }
});



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



Router.patch('/:id', async (req, res)=>{
    const id = req.params.id;
    const body = req.body;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db('sample_airbnb').collection('PubligrafitNode').updateOne({_id: new ObjectId(id)},{$set:{body}});
        if(result){
            res.status(201).json({
                message: 'Se actualizo la pelicula',
                result,
                //data: body
            });
        }else{
            res.status(400).send("No se actualizo la pelicula");
        }
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }
})
//UPDATE MANY
Router.put('/', async (req, res)=>{
  
    const body = req.body;

    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db('sample_airbnb').collection('PubligrafitNode').updateMany({},{$set:{activo:body}});
        if(result){
            res.status(200).json({
                message: 'Se actualizo la pelicula',
                result,
                //data: body
            });
        }else{
            res.status(400).send("No se actualizo la pelicula");
        }
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }
})


// DELETE
// deleteOne() Actualizamos solo un documento
Router.delete('/:id', async (req, res)=>{
    const id = req.params.id;
    const body = req.body;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db('sample_airbnb').collection('PubligrafitNode').deleteOne({_id: new ObjectId(id)});
        if(result){
            res.status(201).json({
                message: 'Se borro la pelicula',
                result,
                //data: body
            });
        }else{
            res.status(400).send("No se actualizo la pelicula");
        }
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }
})
//DELETE MANY 
Router.delete('/', async (req, res)=>{

   const body=req.body;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db('sample_airbnb').collection('PubligrafitNode').deleteMany(body);
        if(result){
            res.status(200).json({
                message: 'Se borro la pelicula',
                result,
                //data: body
            });
        }else{
            res.status(404).send("No se actualizo la pelicula");
        }
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }
})


module.exports=Router;