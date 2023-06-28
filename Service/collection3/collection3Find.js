const {MongoClient, ObjectId} = require('mongodb');
const uri = "mongodb+srv://andres:admin353@cluster0.etevk7a.mongodb.net/?retryWrites=true&w=majority"


class listingFind3{

    constructor(){}

    // READ
    
async find(){
    const client = new MongoClient(uri);
        
    try{
        await client.connect();
        const collection3 = await client.db('sample_sales').collection('collection3').find({}).toArray();  
        return collection3;
    
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
        const collection3 = await client.db('sample_sales').collection('collection3').findOne({
            "_id": new ObjectId(id)
        });  
        return collection3;
   
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
        const collection3 = await client.db('sample_sales').collection('collection3').find({}).skip(5).limit(15).toArray();  
        return collection3;
           
        } catch (e) {
                console.error(e);
        }finally{
        
        await client.close();
        }
        
    }       

}
  
module.exports = listingFind3;