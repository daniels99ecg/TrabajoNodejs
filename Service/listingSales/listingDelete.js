const {MongoClient, ObjectId} = require('mongodb');
const uri = "mongodb+srv://andres:admin353@cluster0.etevk7a.mongodb.net/?retryWrites=true&w=majority";


class listingDelete{

    constructor(){}

    // DELETE

async deleteOne(id){
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const listingSales = await client.db('sample_sales').collection('listingSales').deleteOne({
            "_id": new ObjectId(id)
        });  
    return listingSales;

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
        const listingSales = await client.db('sample_sales').collection('listingSales').deleteMany(body);
    return listingSales;

    } catch (e) {
    console.error(e);
    }finally{

    await client.close();
    }

}
}

module.exports = listingDelete;