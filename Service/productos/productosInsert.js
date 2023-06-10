const {MongoClient, ObjectId} = require('mongodb')
const bodyParser=require('body-parser');
require('dotenv').config();
const uri='mongodb+srv://camilo568:admin@cluster0.b0fdgln.mongodb.net/?retryWrites=true&w=majority'

class productosInsertar{
 constructor(){}


async findOne(body){
    const client=new MongoClient(uri)
   
    try {

        await client.connect();
        const result=await client.db('publigrafit').collection('productos1').insertMany([body]);
        return result
    } catch (e) {
        console.error(e)
    }finally{
        await client.close();
    }
}


}

module.exports=productosInsertar;