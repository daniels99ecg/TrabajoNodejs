const {MongoClient, ObjectId} = require('mongodb')
const bodyParser=require('body-parser');
require('dotenv').config();
const uri='mongodb+srv://camilo568:admin@cluster0.b0fdgln.mongodb.net/?retryWrites=true&w=majority'

class productoDelete{
 constructor(){}



async deleteOne(id){
    
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db('publigrafit').collection('productos1').deleteOne({_id: new ObjectId(id)});
        return result;
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }


}

async deleteMany(body){
    
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db('publigrafit').collection('productos1').deleteMany(body);
        return result
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }
}

}

module.exports=productoDelete;