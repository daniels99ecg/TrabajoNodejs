const {MongoClient, ObjectId} = require('mongodb');

const uri = "mongodb+srv://andres:admin353@cluster0.etevk7a.mongodb.net/?retryWrites=true&w=majority";
class listingFind2{

    constructor(){}

    // READ
    
async find(){
    const client = new MongoClient(uri);
        
    try{
        await client.connect();
        const collection2 = await client.db('sample_sales').collection('collection2').find({}).toArray();  
        return collection2;
    
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
        const collection2 = await client.db('sample_sales').collection('collection2').findOne({
            "_id": new ObjectId(id)
        });  
        return collection2;
   
        } catch (e) {
            console.error(e);
        }finally{

        await client.close();
        }

    }

}

module.exports = listingFind2;