const express=require('express');
const {MongoClient, ObjectId} = require('mongodb')
const Router=express.Router();
const bodyParser=require('body-parser');


const uri = 'mongodb+srv://decruz82:admin@cluster0.bmv0nsj.mongodb.net/?retryWrites=true&w=majority';

Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({extended: true}));
Router.use(express.json());



Router.get('/', async(req, res)=>{
    const client=new MongoClient(uri)
   
    try {

        await client.connect();
        const result=await client.db('sample_airbnb').collection('rol').find({}).toArray();


       if(result){
        res.send(result)
       }else{
        res.send('No se encotro nada')
       }

    } catch (e) {
        console.error(e)
    }finally{
        await client.close();
    }
})


Router.get('/:id', async(req, res)=>{
    const id=req.params.id;
    const client=new MongoClient(uri)
   
    try {

        await client.connect();
        const result=await client.db('sample_airbnb').collection('rol').findOne({_id:new ObjectId(id) });


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
        const result=await client.db('sample_airbnb').collection('rol').insertMany([body]);


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
        const result = await client.db('sample_airbnb').collection('rol').updateOne({_id: new ObjectId(id)},{$set:{body}});
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
Router.put('/', async (req, res)=>{

    const body = req.body;

    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db('sample_airbnb').collection('rol').updateMany({},{$set:{body}});
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
    const body = req.body;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db('sample_airbnb').collection('rol').deleteOne({_id: new ObjectId(id)});
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
        const result = await client.db('sample_airbnb').collection('rol').deleteMany(body);
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