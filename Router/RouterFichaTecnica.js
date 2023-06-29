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

Router.get('/insertar', async (req, res) => {
    res.status(200).render('../View/fichaInsertar');
})

//findlimit limitar 
Router.get('/fichalimit', async (req, res) => { //funcion asincronica
    const result=await listar.findlimit()
    if(result){
        res.status(200).render('../View/ficha',{title:result});
    }else{
        res.status(404).send('No hay insumos');
    }
})

//find para listar todos los documentos de la coleccion
Router.get('/', async (req, res) => { //funcion asincronica
    const result=await listar.find()
    if(result){
        res.status(200).render('../View/ficha',{title:result});
        
    }else{
        res.status(404).send('No hay fichas tecnicas.');
    }


})
//buscar
Router.post('/buscar/', async (req, res) => { 
    const id = req.body.id;
    const result=await listar.finOne({id})
    
    if(result){
    res.status(200).render('../View/fichaFindOne', {title:result})
    
    }else{
        res.status(404).send("Collection not found");
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

    //InsertMany insumos...
    Router.post('/fichainsertar/nuevo', async (req, res) => {

        const cantidadInsumo=parseInt(req.body.cantidadInsumo);
        const costoInsumo=parseInt(req.body.costoInsumo);
        const imagen=req.body.imagen;
        const costoP=req.body.costoP;
        const detalle=req.body.detalle;
        const insumos=parseInt(req.body.insumos);

        const result=await listar2.insertarDatos(cantidadInsumo,costoInsumo,imagen,costoP,detalle,insumos);
        if(result){
            res.status(200).redirect('/ficha');
        }else{
            res.status(404).send("No se Registro la Ficha Tecnica.");
        }
    });
    //findOne Para actulizar
    Router.get('/update/:id', async (req, res) => { //funcion asincronica
        const id=req.params.id; //que va hacer un req con el parametro id
        const result=await listar.finOne({id})
        if(result){
           res.render('../View/fichaupdate',{title:result})
        }else{
            res.status(404).send('No hay ficha tecnica');
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

    //deleOne para eliminar un documento de la coleccion
    Router.get('/eliminarf/:id', async (req, res) => { //funcion asincronica
        const id=req.params.id; //que va hacer un req con el parametro id
        const result=await listar4.deleteOne(id)
        if(result){
                res.status(200).redirect('/ficha')
            }else{
                    res.status(404).send('No se elimino el insumo');
            }
       
            
    })

     //Update
     Router.post('/update/in/:id', async (req, res) => {
        const id=req.params.id; 

        const cantidadInsumo=parseInt(req.body.cantidadInsumo);
        const costoInsumo=parseInt(req.body.costoInsumo);
        const imagen=req.body.imagen;
        const costoP=req.body.costoP;
        const detalle=req.body.detalle;
        const insumos=parseInt(req.body.insumos);

        const result=await listar3.UpdatetOne(id,cantidadInsumo,costoInsumo,imagen,costoP,detalle,insumos);
        if(result){
            res.status(200).redirect('/ficha');
        }else{
            res.status(404).send("No se actualizo la pelicula");
        }
    });


module.exports= Router;