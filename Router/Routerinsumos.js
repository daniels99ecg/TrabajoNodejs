const express=require('express')
const {MongoClient, ObjectId} = require('mongodb'); //Para poder trabajar con Id
const uri='mongodb+srv://ANDRES:admin@cluster0.zaeaoqe.mongodb.net/?retryWrites=true&w=majority';
const bodyParser =require('body-parser')
const insumosFind=require('../Service/insumos/findInsumos')
const insumossInsertar=require('../Service/insumos/Insertarinsumos')
const insumosActualizar=require('../Service/insumos/Actualizarinsumos')
const insumosEliminar=require('../Service/insumos/Eliminarinsumos')
const Router=express.Router();

Router.use(bodyParser.json())

Router.use(bodyParser.urlencoded({extended:true}))

Router.use(express.json())


const listar=new insumosFind()
const listar2=new insumossInsertar()
const listar3=new insumosActualizar()
const listar4=new insumosEliminar()


//find para listar todos los documentos de la coleccion
Router.get('/', async (req, res) => { //funcion asincronica
    const result=await listar.find()
    if(result){
        res.render('../View/insumos', {title:result})
        
    }else{
        res.status(404).send('No hay insumos');
    }


})
   
//findOne Listar un documento de la coleccion
    Router.get('/:id', async (req, res) => { //funcion asincronica
        const id=req.params.id; //que va hacer un req con el parametro id
        const result=await listar.finOne({id})
        if(result){
            res.status(200).send(result);
        }else{
            res.status(404).send('No hay insumos');
        }
    })
    
    
    //InsertMany muchos insumos...
    Router.post('/', async (req, res) => { //funcion asincronica
        const body=req.body;
        const result= await listar2.insertMany(body)
            if(result){
                res.status(200).json({
    
                    message:'Se creo el insumo',
                    result
                });
            }else{
                res.status(404).send('No se registro el insumo');
            }
        })
    
    
    //UpdateOne para actualizar un campo o varios de un insumo..
    Router.put('/:id', async (req, res) => { //funcion asincronica
        const id=req.params.id;
        const insu_nombre=req.body.nombre
        const result=await listar3.UpdatetOne(id,insu_nombre)
            
            if(result){
                res.status(200).json({
        
                    message:'Se Actualizo el insumo',
                    result
                });
            }else{
                    res.status(404).send('No se Actualizo el insumo');
            }
       
            
    })
    
    
    
    
    //EL updateMany par actualizar muchos 
    Router.put('/', async (req, res) => { //funcion asincronica
        const insu_proveedor=req.body.proveedor
        const result=await listar3.updateMany(insu_proveedor)
        if(result){
                res.status(200).json({
        
                    message:'Se Actualizo los insumos',
                    result
                });
            }else{
                    res.status(404).send('No se Actualizo los insumos');
            }
       
    })
    
    //deleteMany para eliminar muchos documentos de la coleccion.
    Router.delete('/', async (req, res) => { //funcion asincronica
        const body=req.body;
        const result= await listar4.deleteMany(body)
       
            if(result){
                res.status(200).json({
        
                    message:'Se eliminaron los insumos',
                    result
                });
            }else{
                    res.status(404).send('No se eliminaron los insumos');
            }
        
            
    })
    
    //deleOne para eliminar un documento de la coleccion
    Router.delete('/:id', async (req, res) => { //funcion asincronica
        const id=req.params.id; //que va hacer un req con el parametro id
        const result=await listar4.deleteOne(id)
        if(result){
                res.status(200).json({
        
                    message:'Se elimino el insumo',
                    result
                });
            }else{
                    res.status(404).send('No se elimino el insumo');
            }
       
            
    })


module.exports= Router;