const {MongoClient, ObjectId} = require('mongodb');
require('dotenv').config();
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

async regist(cliente, nombre, apellido, producto, total){
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const listingSales = await client.db('sample_sales').collection('listingSales').insertMany([
            {
                "dni_cliente": cliente,
                "nombre": nombre,
                "apellido": apellido,
                "producto": producto,
                "total": total
        }
    
        ])    
        return listingSales;
            
        }catch (e) {
            console.error(e);
        }finally{
          
        await client.close();
        }
    }
}

module.exports = listingInsert;