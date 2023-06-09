const {MongoClient, ObjectId} = require('mongodb')

require('dotenv').config();
const uri=process.env.URI;

class UsuariosActualizar{
 constructor(){}



async updateOne(id, body){
   
  
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db('sample_airbnb').collection('rol').updateOne({_id: new ObjectId(id)},{$set:{body}});
        return result;
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }


}

async updateMany(body){

    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db('sample_airbnb').collection('rol').updateMany({},{$set:{body}});
        
       return result;
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }
}

}

module.exports=UsuariosActualizar;