const {MongoClient, ObjectId} = require('mongodb')

require('dotenv').config();
const uri=process.env.URI;

class Usuarios{
 constructor(){}

async find(){
    const client=new MongoClient(uri)
   
    try {

        await client.connect();
        const result=await client.db('sample_airbnb').collection('PubligrafitNode').find({}).toArray();
        return result;

     
    } catch (e) {
        console.error(e)
    }finally{
        await client.close();
    }
}

async findOne(id){
    
    const client=new MongoClient(uri)
   
    try {

        await client.connect();
        const result=await client.db('sample_airbnb').collection('PubligrafitNode').findOne({_id:new ObjectId(id)});
        return result;
    } catch (e) {
        console.error(e)
    }finally{
        await client.close();
    }
}



async findLimit(){
    const client=new MongoClient(uri)
   
    try {

        await client.connect();
        const result=await client.db('sample_airbnb').collection('PubligrafitNode').find({}).skip(5).limit(3).toArray();
        return result;

     
    } catch (e) {
        console.error(e)
    }finally{
        await client.close();
    }
}



// lookup
async aggregate(){
    const client=new MongoClient(uri)
   
    try {

        await client.connect();
        const result=await client.db('sample_airbnb').collection('PubligrafitNode').aggregate([
            {
                $lookup: {
                    from: "rol",
                    localField: "'_id'",
                    foreignField: "'id_rol'",
                    as: "asignacion"
                          }
        },
           {
              $limit: 5
           },
           {
            $sort:{firstName:1}
           }
               

        
    ]).toArray();

        return result;

     
    } catch (e) {
        console.error(e)
    }finally{
        await client.close();
    }
}



//Unwind

async unwind(){
    const client=new MongoClient(uri)
   
    try {

        await client.connect();
        const result=await client.db('sample_airbnb').collection('PubligrafitNodeArray').aggregate([
            {$unwind: '$sizes'}   

        
    ]).toArray();

        return result;

     
    } catch (e) {
        console.error(e)
    }finally{
        await client.close();
    }
}


}



module.exports=Usuarios;