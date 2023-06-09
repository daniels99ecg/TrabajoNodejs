const {MongoClient, ObjectId} = require('mongodb')
const bodyParser=require('body-parser');
require('dotenv').config();
const uri=process.env.URI;

class UsuariosInsertar{
 constructor(){}


async findOne(body){
    const client=new MongoClient(uri)
   
    try {

        await client.connect();
        const result=await client.db('sample_airbnb').collection('rol').insertMany([body]);
        return result
    } catch (e) {
        console.error(e)
    }finally{
        await client.close();
    }
}


}

module.exports=UsuariosInsertar;