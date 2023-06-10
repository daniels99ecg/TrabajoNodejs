const {MongoClient, ObjectId} = require('mongodb'); //Para poder trabajar con Id
const uri='mongodb+srv://ANDRES:admin@cluster0.zaeaoqe.mongodb.net/?retryWrites=true&w=majority';
const bodyParser =require('body-parser')

class fichaTecnicaActualizar{


    constructor(){}

    async UpdatetOne(id,fi_imagen){

        const client=new MongoClient(uri);
        try {
            await client.connect();
            const result = await client.db('Publigrafit').collection('ficha_tecnica').updateOne({_id:new ObjectId(id)},{$set:{imagen_producto_final:fi_imagen}});
            return result
        } catch (error) {
            console.log(error)
        }finally {
            await client.close();
            
    }
    }

    async updateMany(ficha_insumos){
        const client=new MongoClient(uri);
            try {
            await client.connect();
            const result = await client.db('Publigrafit').collection('ficha_tecnica').updateMany({},{$set:{id_insumos:ficha_insumos}});
            return result
        } catch (error) {
            console.log(error)
        }finally {
            await client.close();
            
    }
    }
}





module.exports=fichaTecnicaActualizar;