const express=require('express')
const {MongoClient, ObjectId} = require('mongodb'); //Para poder trabajar con Id
const uri='mongodb+srv://ANDRES:admin@cluster0.zaeaoqe.mongodb.net/?retryWrites=true&w=majority';
const bodyParser =require('body-parser')
const fichaTecnicaFind=require('../Service/fichaTecnica/findFichaTecnica')
const fichaTecnicaInsertar=require('../Service/fichaTecnica/InsertarFichaTecnica')
const fichaTecnicaActualizar=require('../Service/fichaTecnica/ActualizarFichaTecnica')
const fichaTecnicaEliminar=require('../Service/fichaTecnica/EliminarFichaTecnica')
const Router=express.Router();

Router.use(bodyParser.json())

Router.use(bodyParser.urlencoded({extended:true}))

Router.use(express.json())


const listar=new fichaTecnicaFind()
const listar2=new fichaTecnicaInsertar()
const listar3=new fichaTecnicaActualizar()
const listar4=new fichaTecnicaEliminar()


//find para listar todos los documentos de la coleccion
Router.get('/', async (req, res) => { //funcion asincronica
    const result=await listar.find()
    if(result){
        res.status(200).send(result);
        
    }else{
        res.status(404).send('No hay fichas tecnicas.');
    }


})
   
//findOne Listar un documento de la coleccion
    Router.get('/:id', async (req, res) => { //funcion asincronica
        const id=req.params.id; //que va hacer un req con el parametro id
        const result=await listar.finOne({id})
        if(result){
            res.status(200).send(result);
        }else{
            res.status(404).send('No hay ficha tecnica.');
        }
    })
    
    
    //InsertMany muchos insumos...
    Router.post('/', async (req, res) => { //funcion asincronica
        const body=req.body;
        const result= await listar2.insertMany(body)
            if(result){
                res.status(200).json({
    
                    message:'Se creo la ficha Tecnica o fichas tecnicas.',
                    result
                });
            }else{
                res.status(404).send('No se registro las fichas tecnicas.');
            }
        })
    
    
    //UpdateOne para actualizar un campo o varios de un insumo..
    Router.put('/:id', async (req, res) => { //funcion asincronica
        const id=req.params.id;
        const fi_imagen=req.body.imagen_producto_final
        const result=await listar3.UpdatetOne(id,fi_imagen)
            
            if(result){
                res.status(200).json({
        
                    message:'Se Actualizo la ficha tecnica',
                    result
                });
            }else{
                    res.status(404).send('No se Actualizo la ficha tecnica.');
            }
       
            
    })
    
    
    
    
    //EL updateMany par actualizar muchos 
    Router.put('/', async (req, res) => { //funcion asincronica
        const ficha_insumos=req.body.id_insumos
        const result=await listar3.updateMany(ficha_insumos)
        if(result){
                res.status(200).json({
        
                    message:'Se Actualizo las fichas tecnicas',
                    result
                });
            }else{
                    res.status(404).send('No se Actualizo las fichas tecnicas.');
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