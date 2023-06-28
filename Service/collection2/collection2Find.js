const {MongoClient, ObjectId} = require('mongodb');
const uri = "mongodb+srv://andres:admin353@cluster0.etevk7a.mongodb.net/?retryWrites=true&w=majority"


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

async findSkiLi(){
    const client = new MongoClient(uri);   
        
    try {
        await client.connect();
        const collection2 = await client.db('sample_sales').collection('collection2').find({}).skip(10).limit(5).toArray();  
        return collection2;
       
        } catch (e) {
            console.error(e);
        }finally{
    
        await client.close();
        }
    
    }    

async lookup(){
    const client = new MongoClient(uri);
            
    try{
        await client.connect();
        const collection2 = await client.db('sample_sales').collection('collection2').aggregate([
            {
                $lookup: {
                    from: "collection3",
                    localField: "'_id'",
                    foreignField: "'_id'",
                    as: "estado"
            }

        }, {
            $limit:5
        }, {
            $sort: {estado: 1}
        }
    
    ]).toArray();  

        return collection2;
        
        }catch (e) {
            console.error(e);
        }finally{
              
        await client.close();
        }
    } 
    
async unw(){
    const client = new MongoClient(uri);
                
    try{
        await client.connect();
        const collection2 = await client.db('sample_sales').collection('collection2').aggregate([
            {
                $unwind: '$tiendas'        
                  
    }]).toArray();  
    
        return collection2;
            
        }catch (e) {
            console.error(e);
        }finally{
                  
        await client.close();
        }
    }

}
  
module.exports = listingFind2;