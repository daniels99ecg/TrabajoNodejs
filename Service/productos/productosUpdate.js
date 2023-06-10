const {MongoClient, ObjectId} = require('mongodb')

const uri='mongodb+srv://camilo568:admin@cluster0.b0fdgln.mongodb.net/?retryWrites=true&w=majority'

class productosActualizar{
 constructor(){}



async updateOne(id, productos_nombre){
   
  
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db('publigrafit').collection('productos1').updateOne({_id: new ObjectId(id)},{$set:{nombre_producto: productos_nombre}});
        return result;
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }


}

async updateMany(productos_detalle){

    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db('publigrafit').collection('productos1').updateMany({},{$set:{detalle: productos_detalle}});
        
       return result;
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }
}


}

module.exports=productosActualizar;