const {MongoClient, ObjectId} = require('mongodb')

require('dotenv').config();
const uri=process.env.URI;

class Usuarios{
 constructor(){}

async find(){
    const client=new MongoClient(uri)
   
    try {

        await client.connect();
        const result=await client.db('sample_airbnb').collection('PubligrafitNode').find({}).toArray();
        return result;

     
    } catch (e) {
        console.error(e)
    }finally{
        await client.close();
    }
}

}

module.exports=Usuarios;