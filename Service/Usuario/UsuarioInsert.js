const {MongoClient, ObjectId} = require('mongodb')
const bodyParser=require('body-parser');
require('dotenv').config();
const uri=process.env.URI;

class UsuariosInsertar{
 constructor(){}



async insertMany(nombre, apellido, edad, ubicacion){
    
    const client=new MongoClient(uri)
   
    try {

        await client.connect();
        const result=await client.db('sample_airbnb').collection('PubligrafitNode').insertMany([
            {
            "firstName":nombre, 
            "lastName":apellido, 
            "age":edad, 
            "address":ubicacion, 
            "activo":true
        }
    ]);
        return result;
    } catch (e) {
        console.error(e)
    }finally{
        await client.close();
    }
}


}

module.exports=UsuariosInsertar;