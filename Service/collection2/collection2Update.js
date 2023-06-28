const {MongoClient, ObjectId} = require('mongodb');
const uri = "mongodb+srv://andres:admin353@cluster0.etevk7a.mongodb.net/?retryWrites=true&w=majority"

class listingUpdate2{

    constructor(){}
  
    // UPDATE
    
async updateOne(id, pago, detalle, subtotal, iva){
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const collection2 = await client.db('sample_sales').collection('collection2').updateOne({
            "_id": new ObjectId(id)
        },{
            $set:{
                metodopago: pago,
                detalle: detalle, 
                subtotal: subtotal,
                iva: iva
            }
        });  
    return collection2;

    } catch (e) {
        console.error(e);
    }finally{

    await client.close();
    }

}
  
async updateMany(cole2_iva){
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const collection2 = await client.db('sample_sales').collection('collection2').updateMany({
        },{
            $set:{
                iva: cole2_iva
            }
        }); 
    return collection2; 
        
    } catch (e) {
        console.error(e);
    }finally{

    await client.close();
    }

}
}

module.exports = listingUpdate2;