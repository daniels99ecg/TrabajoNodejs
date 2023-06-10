const {MongoClient, ObjectId} = require('mongodb');
const uri = "mongodb+srv://andres:admin353@cluster0.etevk7a.mongodb.net/?retryWrites=true&w=majority";


class listingUpdate{

    constructor(){}
  
    // UPDATE
    
async updateOne(id, listing_nombre, listing_apellido){
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const listingSales = await client.db('sample_sales').collection('listingSales').updateOne({
            "_id": new ObjectId(id)
        },{
            $set:{
                nombre: listing_nombre, 
                apellido: listing_apellido
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