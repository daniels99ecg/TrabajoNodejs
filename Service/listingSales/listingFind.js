const {MongoClient, ObjectId} = require('mongodb');
const uri = "mongodb+srv://andres:admin353@cluster0.etevk7a.mongodb.net/?retryWrites=true&w=majority"

class listingFind{

    constructor(){}

    // READ
    
async find(){
    const client = new MongoClient(uri);
        
    try{
        await client.connect();
        const listingSales = await client.db('sample_sales').collection('listingSales').find({}).toArray();  
        return listingSales;
    
        }catch (e) {
            console.error(e);
        }finally{
          
        await client.close();
        }
    }

async findOne(id){
    const client = new MongoClient(uri);   
    
    try {
        await client.connect();
        const listingSales = await client.db('sample_sales').collection('listingSales').findOne({
            "_id": new ObjectId(id)
        });  
        return listingSales;
   
        } catch (e) {
            console.error(e);
        }finally{

        await client.close();
        }

    }

async findSkiLi(){
    const client = new MongoClient(uri);   
            
    try {
        await client.connect();
        const listingSales = await client.db('sample_sales').collection('listingSales').find({}).skip(2).limit(8).toArray();  
        return listingSales;
           
        } catch (e) {
            console.error(e);
        }finally{
        
        await client.close();
        }
        
    }  

}

module.exports = listingFind;