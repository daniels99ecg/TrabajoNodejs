const {MongoClient, ObjectId} = require('mongodb');
const uri = "mongodb+srv://andres:admin353@cluster0.etevk7a.mongodb.net/?retryWrites=true&w=majority";


class listingUpdate3{

    constructor(){}
  
    // UPDATE
    
async updateOne(id, cole3_cantidad, cole3_estado){
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const collection3 = await client.db('sample_sales').collection('collection3').updateOne({
            "_id": new ObjectId(id)
        },{
            $set:{
                cantidad: cole3_cantidad, 
                estado: cole3_estado
            }
        });  
    return collection3;

    } catch (e) {
        console.error(e);
    }finally{

    await client.close();
    }

}
  
async updateMany(cole3_estado){
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const collection3 = await client.db('sample_sales').collection('collection3').updateMany({
        },{
            $set:{
                estado: cole3_estado
            }
        }); 
    return collection3; 
        
    } catch (e) {
        console.error(e);
    }finally{

    await client.close();
    }

}
}

module.exports = listingUpdate3;