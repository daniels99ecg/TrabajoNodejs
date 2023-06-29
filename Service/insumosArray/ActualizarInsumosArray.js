const {MongoClient, ObjectId} = require('mongodb'); //Para poder trabajar con Id
const uri='mongodb+srv://ANDRES:admin@cluster0.zaeaoqe.mongodb.net/?retryWrites=true&w=majority';
const bodyParser =require('body-parser')

class insumosArrayActualizar{


    constructor(){}

    async UpdatetOne(id,insuArr_nombre){

        const client=new MongoClient(uri);
        try {
            await client.connect();
            const result = await client.db('Publigrafit').collection('insumosarray').updateOne({_id:new ObjectId(id)},{$set:{nombre:insuArr_nombre}});
            return result
        } catch (error) {
            console.log(error)
        }finally {
            await client.close();
            
    }
    }

    async updateMany(insuArr_proveedor){
        const client=new MongoClient(uri);
            try {
            await client.connect();
            const result = await client.db('Publigrafit').collection('insumosarray').updateMany({},{$set:{proveedor:insuArr_proveedor}});
            return result
        } catch (error) {
            console.log(error)
        }finally {
            await client.close();
            
    }
    }
}





module.exports=insumosArrayActualizar;