const {MongoClient, ObjectId} = require('mongodb'); //Para poder trabajar con Id
const uri='mongodb+srv://ANDRES:admin@cluster0.zaeaoqe.mongodb.net/?retryWrites=true&w=majority';
const bodyParser =require('body-parser')

class fichaTecnicaInsertar{


    constructor(){}

    async insertMany(body){

        const client=new MongoClient(uri);
        try {
            await client.connect();
            const result = await client.db('Publigrafit').collection('ficha_tecnica').insertMany([body]);
            return result
            
        } catch (error) {
            console.log(error)
        }finally {
            await client.close();
        
        }
    }
    async insertarDatos(cantidadInsumo,costoInsumo,imagen,costoP,detalle,insumos){
        const client=new MongoClient(uri);
        try {
            await client.connect();
            const result = await client.db('Publigrafit').collection('ficha_tecnica').insertMany([
                {
                "cantidad_insumo":cantidadInsumo,
                "Costo_insumo":costoInsumo,
                "imagen_producto_final":imagen,
                "costo_final_producto":costoP,
                "detalle":detalle,
                "id_insumos":insumos
                }

            ]);
            return result
        } catch (error) {
            console.log(error)
        }finally {
            await client.close();
        }
    }

}

module.exports=fichaTecnicaInsertar;

