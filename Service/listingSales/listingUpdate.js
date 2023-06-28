const {MongoClient, ObjectId} = require('mongodb');
require('dotenv').config();
const uri = "mongodb+srv://andres:admin353@cluster0.etevk7a.mongodb.net/?retryWrites=true&w=majority";
class listingUpdate{

    constructor(){}
  
    // UPDATE
    
async updateOne(id, cliente, nombre, apellido, producto, total){
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const listingSales = await client.db('sample_sales').collection('listingSales').updateOne({
            "_id": new ObjectId(id)
        },{
            $set:{
                dni_cliente: cliente,
                nombre: nombre, 
                apellido: apellido,
                producto: producto,
                total: total
            }
        });  
    return listingSales;

    } catch (e) {
        console.error(e);
    }finally{

    await client.close();
    }

}
  
async updateMany(listing_producto){
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const listingSales = await client.db('sample_sales').collection('listingSales').updateMany({
        },{
            $set:{
                producto: listing_producto
            }
        }); 
    return listingSales; 
        
    } catch (e) {
        console.error(e);
    }finally{

    await client.close();
    }

}
}

module.exports = listingUpdate;