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

Router.get('/insertar', async (req, res) => {
    res.status(200).render('../View/InsumosInsertar');
})
//findlimit limitar 
Router.get('/insumoslimit', async (req, res) => { //funcion asincronica
    const result=await listar.findlimit()
    if(result){
        res.status(200).render('../View/insumos',{title:result});
    }else{
        res.status(404).send('No hay insumos');
    }
})

//find para listar todos los documentos de la coleccion
Router.get('/', async (req, res) => { //funcion asincronica
    const result=await listar.find()
    if(result){
        res.status(200).render('../View/insumos',{title:result});
        
    }else{
        res.status(404).send('No hay insumos');
    }


})
//buscar
Router.post('/buscar/', async (req, res) => { 
    const id = req.body.id;
    const result=await listar.finOne({id})
    
    if(result){
    res.status(200).render('../View/insumosFindOne', {title:result})
    
    }else{
        res.status(404).send("Collection not found");
    }
})

//findloookup
Router.get('/insumoslookup', async (req, res) => { //funcion asincronica
    const result=await listar.findlookup()
    if(result){
        res.status(200).render('../View/insumosLookup', {title:result})
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

//findOne Listar un documento de la coleccion
    Router.get('/update/:id', async (req, res) => { //funcion asincronica
        const id=req.params.id; //que va hacer un req con el parametro id
        const result=await listar.finOne({id})
        if(result){
           res.render('../View/Insumosupdate',{title:result})
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
      
      

        

      //InsertMany insumos...
      Router.post('/insumosinsertar/nuevo', async (req, res) => {
        const nombre=req.body.nombre;
        const precio=parseInt(req.body.precio)
        const cantidad=parseInt(req.body.cantidad);
        const proveedor=req.body.proveedor;
        const estado=req.body.estado;

        const result=await listar2.insertarDatos(nombre,precio,cantidad,proveedor,estado);
        if(result){
            res.status(200).redirect('/insumos');
        }else{
            res.status(404).send("No se Registro el insumo");
        }
    });
    
    
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
    Router.get('/eliminar/:id', async (req, res) => { //funcion asincronica
        const id=req.params.id; //que va hacer un req con el parametro id
        const result=await listar4.deleteOne(id)
        if(result){
                res.status(200).redirect('/insumos')
            }else{
                    res.status(404).send('No se elimino el insumo');
            }
       
            
    })

    //Update
    Router.post('/update/in/:id', async (req, res) => {
        const id=req.params.id; 

        const nombre=req.body.nombre;
        const precio=parseInt(req.body.precio)
        const cantidad=parseInt(req.body.cantidad);
        const proveedor=req.body.proveedor;
        const estado=req.body.estado;

        const result=await listar3.UpdatetOne(id,nombre,precio,cantidad,proveedor,estado);
        if(result){
            res.status(200).redirect('/insumos');
        }else{
            res.status(404).send("No se actualizo la pelicula");
        }
    });

    


module.exports= Router;