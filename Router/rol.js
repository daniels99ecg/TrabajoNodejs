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


Router.get('/create', async(req, res)=>{
    
    res.render('../View/RolInsertar')
  
});

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
        res.status(200).render('../View/RolFindOne', {title:result})
      }else{
       res.status(404).send('No se encotro nada')
      }
});

Router.post('/buscar', async(req, res)=>{
    const id=req.body.id;
    const nombreRol=req.body.nombreRol;
    const result= await listar.findOne({id})
    if(result){
        res.status(200).render('../View/RolFindOne', {title:result})
      }else{
       res.status(404).send('No se encotro nada')
      }
});




Router.post('/create/in', async(req, res)=>{
 
    const nombre=req.body.nombre;
    const fecha=new Date();
    const descripcion=req.body.descripcion;
    const result = await insertar.insertMany(nombre, fecha, descripcion)
       if(result){
         res.status(200).redirect('/rol')
       }else{
        res.status(404).send('No se agrego la pelicula')
       }

    
});

Router.get('/update/:id', async(req, res)=>{
    const id=req.params.id;
    const result= await listar.findOne({id})
    if(result){
        res.status(200).render('../View/RolUpdate', {title:result})
      }else{
       res.status(404).send('No se encotro nada')
      }
});

Router.post('/update/in/:id', async (req, res)=>{
    const id=req.params.id;
   const nombre=req.body.nombre;
   const fecha=new Date();
   const descripcion=req.body.descripcion;

    const result = await actualizar.updateOne(id, nombre, fecha, descripcion);
        if(result){
            res.status(200).redirect('/rol')
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
Router.get('/eliminar/:id', async (req, res)=>{
    const id = req.params.id;
  
    const result = await eliminar.deleteOne(id);
        if(result){
            res.status(200).redirect('/rol')
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