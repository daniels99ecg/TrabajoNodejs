const {MongoClient} = require('mongodb');
const {faker} = require('@faker-js/faker');
const uri = "mongodb+srv://andres:admin353@cluster0.etevk7a.mongodb.net/?retryWrites=true&w=majority";

// Actualizar un elemento

// async function actualizarVenta(tipoVenta, campoActualizar){
//     const client = new MongoClient(uri);
    
//     try {
//         await client.connect();
//         const result = await client.db('sample_sales').collection('listingSales').
//         updateOne({dni_cliente: tipoVenta}, {$set: {producto: campoActualizar}})
//         console.log(`${result.matchedCount} venta(s) cumple con el citerio de búsqueda`);
//         console.log(`${result.modifiedCount} venta(s) fue(ron) actualizada(s)`);
      
//     } catch (e) {
//         console.error(e);
//     }finally{
    
//         await client.close();
//     }
// }

// actualizarVenta(9, "Mercedes Benz");

// // Actualizar muchos elementos
    
// async function actualizarVenta(campoActualizar){
//     const client = new MongoClient(uri);
    
//     try {
//         await client.connect();
//         const result = await client.db('sample_sales').collection('collection3').
//         updateMany({}, {$set: {_id_colection: campoActualizar}})
//         console.log(`${result.matchedCount} venta(s) cumple con el citerio de búsqueda`);
//         console.log(`${result.modifiedCount} venta(s) fue(ron) actualizada(s)`);
      
//     } catch (e) {
//         console.error(e);
//     }finally{
    
//         await client.close();
//     }   
// }
    
// actualizarVenta(faker.number.int({min: 1, max: 100}));

async function actualizarVenta(){
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const result = await client.db('sample_sales').collection('collection3').
        updateMany({}, {$rename: {"metodo_compra": metodocompra}});
        console.log(`${result.matchedCount} venta(s) cumple con el citerio de búsqueda`);
        console.log(`${result.modifiedCount} venta(s) fue(ron) actualizada(s)`);
      
    } catch (e) {
        console.error(e);
    }finally{
    
        await client.close();
    }   
}

actualizarVenta();


