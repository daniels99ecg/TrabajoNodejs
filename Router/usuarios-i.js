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

//Archivo con vista 
Router.get('/', async(req, res)=>{

   const result=await Usuarios1.find();
    if(result){
        res.render('../View/Usuarios', {title:result})
       }else{
        res.send('No se encotro nada')
       }
})

//Find con salto y limite
Router.get('/limite', async(req, res)=>{

    const result=await Usuarios1.findLimit();
     if(result){
        //  res.send(result)
        res.render('../View/Usuarios', {title:result})
        }else{
         res.send('No se encotro nada')
        }
 })


//Listar
Router.post('/buscar/', async(req, res)=>{
    const id=req.body.id;
    
    const result=await Usuarios1.findOne({id});

    if(result){
        res.render('../View/UsuariosFindOne', {title:result})
      }else{
       res.status(404).send('No se encotro nada')
      }
});  

//Actualizar Pruebas envio de cosas
Router.get('/update/:id', async(req, res)=>{
    const id=req.params.id;
    
    const result=await Usuarios1.findOne({id});

    if(result){
        res.render('../View/usuarioupdate', {title:result})
      }else{
       res.status(404).send('No se encotro nada')
      }
})

//Archivo sin vista para el finOne
Router.get('/pruebas/:id', async(req, res)=>{
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
Router.post('/update/in/:id', async (req, res)=>{
    const id = req.params.id;

    const nombre=req.body.nombre; 
    const apellido=req.body.apellido;
    const edad=parseInt( req.body.edad);
    const direccion=req.body.direccion; 
    
    


    const result= await actualizar.updateOne(id, nombre, apellido, edad, direccion);

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

Router.get('/eliminar/:id', async (req, res)=>{
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
//Archivo delete sin vista
Router.delete('/pruebas/:id', async (req, res)=>{
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



//aggregate
Router.get('/agregacion', async(req, res)=>{

    const result=await Usuarios1.aggregate();
     if(result){
        res.send(result)
       
        }else{
         res.send('No se encotro nada')
        }
 })
   
//unwind
 Router.get('/array', async(req, res)=>{

    const result=await Usuarios1.unwind();
     if(result){
        res.send(result)
       
        }else{
         res.send('No se encotro nada')
        }
 })
   





module.exports=Router;