const express = require('express')
const {MongoClient,ObjectId}=require('mongodb')
const uri='mongodb+srv://valeria:admin@cluster0.wcriixv.mongodb.net/?retryWrites=true&w=majority'
const bodyParser = require('body-parser')
const clientesFind = require('../Service/clientes/clientesFind')
const clientesInsertar = require('../Service/clientes/clientesInsertar')
const clientesUpdate = require('../Service/clientes/clientesUpdate')
const clientesDelete = require('../Service/clientes/clientesDelete')
const Router = express.Router()

Router.use(bodyParser.json())

Router.use(bodyParser.urlencoded({extended:true}))

Router.use(express.json())

const listar = new clientesFind()
const insertar = new clientesInsertar()
const actualizar = new clientesUpdate()
const eliminar = new clientesDelete()
Router.get('/', async(req, res)=>{ //Funcion asincronica
    
    const result = await listar.find()
    
    if(result){
        res.status(200).send(result)
        }else{
            res.status(404).send('No hay clientes')
        }
    })
    
    
    
    Router.get('/:id', async(req, res)=>{ //Funcion asincronica - mandar id
        const id = req.params.id

        const result = await listar.findOne({id})

        if(result){
            res.status(200).send(result)
            }else{
                res.status(404).send('No hay clientes')
            }
        })
    
    
    
        Router.post('/', async(req, res)=>{ //Funcion asincronica - mandar id
            const body = req.body;
            const result = await insertar.insertMany(body)
            if(result){
                res.status(200).json({
        
        
                    message:'Se creo la compra',
                    result
                })
                }else{
                    res.status(404).send('No se registro la compra')
                }
            })
    
    
    
            Router.put('/:id', async(req, res)=>{ //Funcion asincronica - mandar id
                const body = req.body;
                const id = req.params.id
                const result = actualizar.updateOne(id, body)
                if(result){
                res.status(200).json({
        
        
                    message:'Se actualizo la compra',
                    result
                })
                }else{
                    res.status(404).send('No se actualizo la compra')
                }
                
                })
    
    
    
                Router.put('/', async(req, res)=>{ //Funcion asincronica - mandar id
                    
                    const body = req.body;
                    const result = await actualizar.updateMany(body)
                    
                    if(result){
                        res.status(200).json({
                
                
                            message:'Se actualizo la compra',
                            result
                        })
                        }else{
                            res.status(404).send('No se actualizo la compra')
                        }
                    })
    
    
    
                Router.delete('/', async(req, res)=>{ //Funcion asincronica - mandar id
                    const client = new MongoClient(uri)
                    const body = req.body;
                    const result = await eliminar.deleteMany(body)

                    
                    if(result){
                    res.status(200).json({
            
            
                        message:'Se elimino la compra',
                        result
                    })
                    }else{
                        res.status(404).send('No se elimino la compra')
                    }
                    
                    })
    
    
    
                    Router.delete('/:id', async(req, res)=>{ //Funcion asincronica - mandar id
                        const client = new MongoClient(uri)
                        const id = req.params.id
    
                        const result = await eliminar.deleteOne(id)
                        if(result){
                        res.status(200).json({
                
                
                            message:'Se elimino la compra',
                            result
                        })
                        }else{
                            res.status(404).send('No se elimino la compra')
                        }
                        
                        
                        
                        })
    


module.exports = Router;
