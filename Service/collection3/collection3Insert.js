const {MongoClient, ObjectId} = require('mongodb');
const uri = "mongodb+srv://andres:admin353@cluster0.etevk7a.mongodb.net/?retryWrites=true&w=majority";


class listingInsert3{

    constructor(){}

    // INSERT

async insertMany(body){
    const client = new MongoClient(uri); 

    try {
        await client.connect();
        const collection3 = await client.db('sample_sales').collection('collection3').insertMany([body]);  
    return collection3;


    } catch (e) {
        console.error(e);
    }finally{

        await client.close();
    }
}
}

module.exports = listingInsert3;