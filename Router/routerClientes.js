const express = require('express')
const {MongoClient,ObjectId}=require('mongodb')
const uri='mongodb+srv://valeria:admin@cluster0.wcriixv.mongodb.net/?retryWrites=true&w=majority'
const bodyParser = require('body-parser')
const clientesFind = require('../Service/clientes/clientesFind')
const clientesInsertar = require('../Service/clientes/clientesInsertar')
const clientesUpdate = require('../Service/clientes/clientesUpdate')
const clientesDelete = require('../Service/clientes/clientesDelete')
const e = require('express')
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
        res.status(200).render('../View/clienteListar', {title: result})
        }else{
            res.status(404).send('No hay clientes')
        }
    })
    
    Router.get('/create', async(req, res)=>{
        res.status(200).render('../View/clienteInsertar')
    })
    
    Router.get('/:id', async(req, res)=>{ //Funcion asincronica - mandar id
        const id = req.params.id

        const result = await listar.findOne({id})

        if(result){
            res.status(200).render('../View/clienteListar', {title: result})
            }else{
                res.status(404).send('No hay clientes')
            }
        })

        Router.post('/buscar/', async(req, res)=>{ //Funcion asincronica - mandar id
            const id = req.body.id
    
            const result = await listar.findOne({id})
    
            if(result){
                res.status(200).render('../View/clienteFindOne', {title: result})
                }else{
                    res.status(404).send('No hay clientes')
                }
            })

        Router.get('/update/:id', async(req, res)=>{ //Funcion asincronica - mandar id
            const id = req.params.id
    
            const result = await listar.findOne({id})
    
            if(result){
                res.status(200).render('../View/clienteActualizar', {title: result})
                }else{
                    res.status(404).send('No hay clientes')
                }
            })
    
    //insert update
    Router.post('/update/in/:id', async(req, res)=>{ //Funcion asincronica - mandar id
        const id = req.params.id
        const nombre = req.body.nombre
        const apellido = req.body.apellido
        const telefono = req.body.telefono
        const direccion = req.body.direccion
        const email = req.body.email
        const result = actualizar.updateOne(id, nombre, apellido, telefono, direccion, email)
        if(result){
        res.status(200).redirect('/clientes')
        }else{
            res.status(404).send('No se actualizo la compra')
        }
        
        })
    
        Router.post('/create/in', async(req, res)=>{ //Funcion asincronica - mandar id
            const nombre = req.body.nombre
            const apellido = req.body.apellido
            const telefono = req.body.telefono
            const direccion = req.body.direccion
            const email = req.body.email
            const result = await insertar.insertMany(nombre, apellido, telefono, direccion, email)
            if(result){
                res.status(200).redirect('/clientes')
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
                        res.status(200).redirect('/clientes')
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
                        res.status(200).redirect('/clientes')
                        }else{
                            res.status(404).send('No se elimino la compra')
                        }
                        
                        
                        
                        })
    


module.exports = Router;
