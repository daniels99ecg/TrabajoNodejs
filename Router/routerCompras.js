const express = require('express')
const {MongoClient,ObjectId}=require('mongodb')
const uri='mongodb+srv://valeria:admin@cluster0.wcriixv.mongodb.net/?retryWrites=true&w=majority'
const bodyParser = require('body-parser')
const comprasFind = require('../Service/compras/comprasFind')
const comprasInsertar = require('../Service/compras/comprasInsertar')
const comprasUpdate = require('../Service/compras/comprasUpdate')
const comprasDelete = require('../Service/compras/comprasDelete')
const Router = express.Router()

Router.use(bodyParser.json())

Router.use(bodyParser.urlencoded({extended:true}))

Router.use(express.json())

const listar = new comprasFind()
const insertar = new comprasInsertar()
const actualizar = new comprasUpdate()
const eliminar = new comprasDelete()
Router.get('/', async(req, res)=>{ //Funcion asincronica
    
    const result = await listar.find()
    
    if(result){
        res.status(200).render('../View/comprasListar', {title: result})
        }else{
            res.status(404).send('No hay compras')
        }
    })
    
    Router.get('/agregacion', async(req, res)=>{ //Funcion asincronica
    
        const result = await listar.aggregate()
        
        if(result){
            res.status(200).render('../View/compraLookup', {title: result})
            }else{
                res.status(404).send('No hay compras')
            }
        })
    


        Router.get('/unwind', async(req, res)=>{ //Funcion asincronica
    
            const result = await listar.unwind()
            
            
            if(result){
                res.status(200).send(result)
                }else{
                    res.status(404).send('No hay compras')
                }
            })
    
    Router.post('/buscar/', async(req, res)=>{ //Funcion asincronica - mandar id
        const id = req.body.id
        const result = await listar.findOne({id})

        if(result){
            res.status(200).render('../View/compraFindOne', {title: result})
            }else{
                res.status(404).send('No hay compras')
            }
        })
    
        Router.get('/create', async(req, res)=>{

            res.status(200).render('../View/compraInsertar')
            
        })
    
        Router.post('/create/in', async(req, res)=>{ //Funcion asincronica - mandar id
            const proveedor = req.body.proveedor;
            const cantidad =parseInt(req.body.cantidad);
            const fecha = new Date();
            const total = parseInt(req.body.total);
            const result = await insertar.insertMany(proveedor, cantidad, fecha, total)
            
            if(result){
                res.status(200).redirect('/compras')
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
    
                Router.get('/update/:id', async(req, res)=>{ //Funcion asincronica - mandar id
                    const id = req.params.id
            
                    const result = await listar.findOne({id})
            
                    if(result){
                        res.status(200).render('../View/compraActualizar', {title: result})
                        }else{
                            res.status(404).send('No hay compras')
                        }
                    })

                    Router.post('/update/in/:id', async(req, res)=>{ 
                        const id = req.params.id;
                        const proveedor = req.body.proveedor;
                        const cantidad =parseInt(req.body.cantidad);
                        const fecha = new Date();
                        const total = parseInt(req.body.total);
                        const result = actualizar.updateOne(id, proveedor, cantidad, fecha, total)

                        if(result){
                            res.status(200).redirect('/compras')
                            }else{
                                res.status(404).send('No se registro la compra')
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
    
    
    
                    Router.get('/eliminar/:id', async(req, res)=>{ //Funcion asincronica - mandar id
                        const client = new MongoClient(uri)
                        const id = req.params.id
    
                        const result = await eliminar.deleteOne(id)
                        if(result){
                        res.status(200).redirect('/compras')
                        }else{
                            res.status(404).send('No se elimino la compra')
                        }
                        
                        
                        
                        })
    


module.exports = Router;
