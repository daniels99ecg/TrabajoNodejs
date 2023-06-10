const {MongoClient, ObjectId} = require('mongodb');
const uri = "mongodb+srv://andres:admin353@cluster0.etevk7a.mongodb.net/?retryWrites=true&w=majority";


class listingInsert{

    constructor(){}

    // INSERT

async insertMany(body){
    const client = new MongoClient(uri); 

    try {
        await client.connect();
        const listingSales = await client.db('sample_sales').collection('listingSales').insertMany([body]);  
    return listingSales;


    } catch (e) {
        console.error(e);
    }finally{

        await client.close();
    }
}
}

module.exports = listingInsert;