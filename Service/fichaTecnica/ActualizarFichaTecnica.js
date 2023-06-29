const {MongoClient, ObjectId} = require('mongodb'); //Para poder trabajar con Id
const uri='mongodb+srv://ANDRES:admin@cluster0.zaeaoqe.mongodb.net/?retryWrites=true&w=majority';
const bodyParser =require('body-parser')

class fichaTecnicaActualizar{


    constructor(){}

    
    async UpdatetOne(id,cantidadInsumo,costoInsumo,imagen,costoP,detalle,insumos){

        const client=new MongoClient(uri);
        try {
            await client.connect();
            const result = await client.db('Publigrafit').collection('ficha_tecnica').updateOne({_id:new ObjectId(id)},{$set:
                {
                cantidad_insumo:cantidadInsumo,
                Costo_insumo:costoInsumo,
                imagen_producto_final:imagen,
                costo_final_producto:costoP,
                detalle:detalle,
                id_insumos:insumos
                }
            });
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