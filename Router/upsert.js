const {MongoClient, ObjectId} = require('mongodb');
const {faker} = require('@faker-js/faker');
const uri = "mongodb+srv://andres:admin353@cluster0.etevk7a.mongodb.net/?retryWrites=true&w=majority";

// Upsert agregamos un documento en caso de que no exista

async function actualizarVenta(campoActualizar){
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const result = await client.db('sample_sales').collection('collection2').
        updateMany({}, {$set: {tiendas:campoActualizar}}, {upsert:true} )
        console.log(`${result.matchedCount} venta(s) cumple con el citerio de búsqueda`);
        console.log(`${result.modifiedCount} venta(s) fue(ron) actualizada(s)`);
      
    } catch (e) {
        console.error(e);
    }finally{
    
    await client.close();
    }
}
    
actualizarVenta(["Litograf", "Grafix", "Sidergrafic", "Shofigrap"]);