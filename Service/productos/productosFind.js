const {MongoClient, ObjectId} = require('mongodb')
const bodyParser=require('body-parser');
require('dotenv').config();
const uri='mongodb+srv://camilo568:admin@cluster0.b0fdgln.mongodb.net/?retryWrites=true&w=majority'

class productosInsertar{
 constructor(){}



async find(){
    
    const client=new MongoClient(uri)
   
    try {

        await client.connect();
        const result=await client.db('publigrafit').collection('productos1').find({}).toArray();
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
        const result=await client.db('publigrafit').collection('productos1').findOne({_id:new ObjectId(id) });
        return result
    } catch (e) {
        console.error(e)
    }finally{
        await client.close();
    }
}


}

module.exports=productosInsertar;