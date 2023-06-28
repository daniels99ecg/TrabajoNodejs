const {MongoClient, ObjectId} = require('mongodb')
const bodyParser=require('body-parser');
require('dotenv').config();
const uri=process.env.URI;

class UsuariosInsertar{
 constructor(){}


async insertMany(nombre, fecha, descripcion){
    const client=new MongoClient(uri)
   
    try {

        await client.connect();
        const result=await client.db('sample_airbnb').collection('rol').insertMany([{

            "nameRol": nombre,
            "fecha":fecha,
            "descripcion": descripcion,
            "id_rol":23
        }]);
        return result
    } catch (e) {
        console.error(e)
    }finally{
        await client.close();
    }
}


}

module.exports=UsuariosInsertar;