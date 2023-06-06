const express=require('express');
const {MongoClient, ObjectId} = require('mongodb')
const Router=express.Router();
const bodyParser=require('body-parser');
require('dotenv').config();



Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({extended: true}));
Router.use(express.json());
const uri=process.env.URI;

Router.get('/', async(req, res)=>{
    const client=new MongoClient(uri)
   
    try {

        await client.connect();
        const result=await client.db('sample_airbnb').collection('PubligrafitNode').find({}).toArray();


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
module.exports=Router;