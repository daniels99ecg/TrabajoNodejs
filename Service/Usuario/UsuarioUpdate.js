const {MongoClient, ObjectId} = require('mongodb')
const bodyParser=require('body-parser');

require('dotenv').config();
const uri=process.env.URI;

class UsuariosActualizar{
 constructor(){}



async updateOne(id, nombre, apellido, edad, direccion){
   
  
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db('sample_airbnb').collection('PubligrafitNode').updateOne(
            {_id: new ObjectId(id)},{$set:{
                
                
                'firstName':nombre,
                'lastName':apellido,  
                'age':edad,
                'address':direccion,
                
                
            }}
            );
        return result;
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }


}

async updateMany(){

    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db('sample_airbnb').collection('PubligrafitNode').updateMany({},{$set:{activo:body}});
        
       return result;
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }
}

}

module.exports=UsuariosActualizar;