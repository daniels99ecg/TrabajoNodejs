const {MongoClient, ObjectId} = require('mongodb')
const bodyParser=require('body-parser');
require('dotenv').config();
const uri=process.env.URI;

class UsuariosDelete{
 constructor(){}



async deleteOne(id){
    
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db('sample_airbnb').collection('PubligrafitNode').deleteOne({_id: new ObjectId(id)});
        return result;
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }


}

async deleteMany(){
    
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db('sample_airbnb').collection('PubligrafitNode').deleteMany(body);
        return result
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }
}

}

module.exports=UsuariosDelete;