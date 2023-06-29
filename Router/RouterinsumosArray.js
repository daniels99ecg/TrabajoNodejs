const express=require('express')
const {MongoClient, ObjectId} = require('mongodb'); //Para poder trabajar con Id
const uri='mongodb+srv://ANDRES:admin@cluster0.zaeaoqe.mongodb.net/?retryWrites=true&w=majority';
const bodyParser =require('body-parser')
const insumosArrayFind=require('../Service/insumosArray/FindInsumosArray')
const insumosArrayInsertar=require('../Service/insumosArray/InsertarInsumosArray')
const insumosArrayActualizar=require('../Service/insumosArray/ActualizarInsumosArray')
const insumosArrayEliminar=require('../Service/insumosArray/EliminarInsumosArray')
const Router=express.Router();

Router.use(bodyParser.json())

Router.use(bodyParser.urlencoded({extended:true}))

Router.use(express.json())


const listar=new insumosArrayFind()
const listar2=new insumosArrayInsertar()
const listar3=new insumosArrayActualizar()
const listar4=new insumosArrayEliminar()


//findloookup
Router.get('/insumosunwind', async (req, res) => { //funcion asincronica
    const result=await listar.findunwind()
    if(result){
        res.status(200).send(result);
    }else{
        res.status(404).send('No hay insumos');
    }
})

//find para listar todos los documentos de la coleccion
Router.get('/', async (req, res) => { //funcion asincronica
    const result=await listar.find()
    if(result){
        res.status(200).send(result);
        
    }else{
        res.status(404).send('No hay insumos con Array');
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
    
                    message:'Se creo el insumo con Array',
                    result
                });
            }else{
                res.status(404).send('No se registro el insumo con Array');
            }
        })
    
    
    //UpdateOne para actualizar un campo o varios de un insumo..
    Router.put('/:id', async (req, res) => { //funcion asincronica
        const id=req.params.id;
        const insuArr_nombre=req.body.nombre
        const result=await listar3.UpdatetOne(id,insuArr_nombre)
            
            if(result){
                res.status(200).json({
        
                    message:'Se Actualizo el insumo con Array',
                    result
                });
            }else{
                    res.status(404).send('No se Actualizo el insumo con Array');
            }
       
            
    })
    
    
    
    
    //EL updateMany par actualizar muchos 
    Router.put('/', async (req, res) => { //funcion asincronica
        const insuArr_proveedor=req.body.proveedor
        const result=await listar3.updateMany(insuArr_proveedor)
        if(result){
                res.status(200).json({
        
                    message:'Se Actualizo los insumos con Array',
                    result
                });
            }else{
                    res.status(404).send('No se Actualizo los insumos con Array');
            }
       
    })
    
    //deleteMany para eliminar muchos documentos de la coleccion.
    Router.delete('/', async (req, res) => { //funcion asincronica
        const body=req.body;
        const result= await listar4.deleteMany(body)
       
            if(result){
                res.status(200).json({
        
                    message:'Se eliminaron los insumos con Array',
                    result
                });
            }else{
                    res.status(404).send('No se eliminaron los insumos con Array');
            }
        
            
    })
    
    //deleOne para eliminar un documento de la coleccion
    Router.delete('/:id', async (req, res) => { //funcion asincronica
        const id=req.params.id; //que va hacer un req con el parametro id
        const result=await listar4.deleteOne(id)
        if(result){
                res.status(200).json({
        
                    message:'Se elimino el insumo con array',
                    result
                });
            }else{
                    res.status(404).send('No se elimino el insumo con array');
            }
       
            
    })


module.exports= Router;