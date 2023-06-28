const {MongoClient, ObjectId} = require('mongodb');
const uri = "mongodb+srv://andres:admin353@cluster0.etevk7a.mongodb.net/?retryWrites=true&w=majority";

// Eliminar un elemento

async function eliminarVenta(nombreVenta){
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const result = await client.db('sample_sales').collection('listingSales').
        deleteOne({dni_cliente: nombreVenta});
        console.log(`${result.deletedCount} venta(s) fue(ron) eliminida(s)`)
      
    } catch (e) {
        console.error(e);
    }finally{
    
        await client.close();
    }
}

// eliminarVenta(9);

// // Eliminar muchos elementos

async function eliminarVenta(nombreVenta){
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const result = await client.db('sample_sales').collection('listingSales').
        deleteMany({nombreVenta});
        console.log(`${result.deletedCount} venta(s) fue(ron) eliminida(s)`)
      
    } catch (e) {
        console.error(e);
    }finally{
    
        await client.close();
    }
}

eliminarVenta();


// Elimina la lista de colección

async function eliminarVenta(){
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const result = await client.db('sample_sales').collection('collection3').
        drop({});
        console.log(`${result.deletedCount} lista(s) fue(ron) eliminida(s)`)
      
    } catch (e) {
        console.error(e);
    }finally{
    
        await client.close();
    }
}

eliminarVenta();