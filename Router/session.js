const express=require('express');
const {MongoClient, ObjectId} = require('mongodb')
const Router=express.Router();
const bodyParser=require('body-parser');


require('dotenv').config();




process.env.URI;

Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({extended: true}));
Router.use(express.json());




Router.get('/',async (req, res)=>{
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const movies = await client.db("sample_mflix").collection("sessions").find({}).toArray();
        if(movies){
            res.send(movies);
        }else{
            res.send("No se encontro la informacion");
        }
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }
})


Router.get('/:id', async(req, res)=>{
    const id=req.params.id;
    const client=new MongoClient(uri)
   
    try {

        await client.connect();
        const result=await client.db("sample_mflix").collection("sessions").findOne({_id:new ObjectId(id) });


       if(result){
         res.status(200).send(result)
       }else{
        res.status(404).send('No se encotro nada')
       }

    } catch (e) {
        console.error(e)
    }finally{
        await client.close();
    }
});




Router.post('/', async(req, res)=>{
    const body=req.body;
    const client=new MongoClient(uri)
   
    try {

        await client.connect();
        const result=await client.db("sample_mflix").collection("sessions").insertMany([{body}]);


       if(result){
         res.status(200).json({
            message: 'Se creo la pelicula',
            result,
        
         });
       }else{
        res.status(404).send('No se agrego la pelicula')
       }

    } catch (e) {
        console.error(e)
    }finally{
        await client.close();
    }
});

Router.patch('/:id', async (req, res)=>{
    const id = req.params.id;
    const body = req.body;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db("sample_mflix").collection("sessions").updateOne({_id: new ObjectId(id)},{$set:{title:body, year:body.year}});
        if(result){
            res.status(201).json({
                message: 'Se actualizo la pelicula',
                result,
                //data: body
            });
        }else{
            res.status(400).send("No se actualizo la pelicula");
        }
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }
})


//UPDATE MANY
Router.put('/:id', async (req, res)=>{
    const id=req.params.id;
    const body = req.body;

    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db("sample_mflix").collection("sessions").updateMany({title:id},{$set:{title:body}});
        if(result){
            res.status(201).json({
                message: 'Se actualizo la pelicula',
                result,
                //data: body
            });
        }else{
            res.status(400).send("No se actualizo la pelicula");
        }
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }
})


// DELETE
// deleteOne() Actualizamos solo un documento
Router.delete('/:id', async (req, res)=>{
    const id = req.params.id;
   
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db("sample_mflix").collection("sessions").deleteOne({_id: new ObjectId(id)});
        if(result){
            res.status(201).json({
                message: 'Se borro la pelicula',
                result,
                //data: body
            });
        }else{
            res.status(400).send("No se actualizo la pelicula");
        }
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }
})

//DELETE MANY 
Router.delete('/', async (req, res)=>{

    const body=req.body;
     const client = new MongoClient(uri);
     try {
         await client.connect();
         const result = await client.db("sample_mflix").collection("sessions").deleteMany(body);
         if(result){
             res.status(200).json({
                 message: 'Se borro la pelicula',
                 result,
                 //data: body
             });
         }else{
             res.status(404).send("No se actualizo la pelicula");
         }
     }catch(e){
         console.log(e);
     }finally{
         await client.close();
     }
 })

module.exports=Router;