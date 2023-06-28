const {MongoClient, ObjectId} = require('mongodb');
const uri = "mongodb+srv://andres:admin353@cluster0.etevk7a.mongodb.net/?retryWrites=true&w=majority"


class listingInsert2{

    constructor(){}

    // INSERT

async insertMany(body){
    const client = new MongoClient(uri); 

    try {
        await client.connect();
        const collection2 = await client.db('sample_sales').collection('collection2').insertMany([body]);  
    return collection2;


    } catch (e) {
        console.error(e);
    }finally{

        await client.close();
    }
}

async regist (pago, detalle, subtotal, iva){
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const collection2 = await client.db('sample_sales').collection('collection2').insertMany([
            {
                "metodopago": pago,
                "detalle": detalle,
                "subtotal": subtotal,
                "iva": iva
    }

    ])    
        return collection2;
        
        }catch (e) {
            console.error(e);
        }finally{
      
        await client.close();
        }
    }
    
}    

module.exports = listingInsert2;