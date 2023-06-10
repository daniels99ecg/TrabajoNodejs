const {MongoClient, ObjectId} = require('mongodb');
const uri = "mongodb+srv://andres:admin353@cluster0.etevk7a.mongodb.net/?retryWrites=true&w=majority";

class listingDelete3{

    constructor(){}

    // DELETE

async deleteOne(id){
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const collection3 = await client.db('sample_sales').collection('collection3').deleteOne({
            "_id": new ObjectId(id)
        });  
    return collection3;

    } catch (e) {
    console.error(e);
    }finally{

    await client.close();
    }

}

async deleteMany(body){
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const collection3 = await client.db('sample_sales').collection('collection3').deleteMany(body);
    return collection3;

    } catch (e) {
    console.error(e);
    }finally{

    await client.close();
    }

}
}

module.exports = listingDelete3;