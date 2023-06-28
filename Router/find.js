const {MongoClient} = require('mongodb');
const {faker} = require('@faker-js/faker');
const uri = "mongodb+srv://andres:admin353@cluster0.etevk7a.mongodb.net/?retryWrites=true&w=majority";


//Encontrar todos los registros de venta

// async function encontrarVenta(nombreVenta){
//     const client = new MongoClient(uri);

//     try {
//         await client.connect();
//         const result = await client.db('sample_sales').collection('listingSales').
//         find({}).toArray()

//         if(result){
//             console.log(`Se encontró una venta de nombre ${nombreVenta}`);
//             console.log(result);
//         }else{
//             console.log(`No se encontró una venta de nombre ${nombreVenta}`);
//         }
  
//     } catch (e) {
//         console.error(e);
//     }finally{

//     await client.close();
//     }
// }

// encontrarVenta();


// //Encontrar un registro de venta


// async function encontrarVenta(nombreVenta){
//         const client = new MongoClient(uri);
    
//         try {
//             await client.connect();
//             const result = await client.db('sample_sales').collection('listingSales').
//             findOne({dni_cliente: nombreVenta})
//             if(result){
//                 console.log(`Se encontró una venta de nombre ${nombreVenta}`);
//                 console.log(result);
//             }else{
//                 console.log(`No se encontró venta de nombre ${nombreVenta}`);
//             }
      
//         } catch (e) {
//             console.error(e);
//         }finally{
    
//         await client.close();
//         }
//     }
    
//     encontrarVenta(9);



// //Encontrar por un límite definido

// async function encontrarVenta(nombreVenta){
//     const client = new MongoClient(uri);

//     try {
//         await client.connect();
//         const result = await client.db('sample_sales').collection('listingSales').
//         find({}).limit(5);

//         const result2= await result.toArray();
//         console.log(result2);
  
//     } catch (e) {
//         console.error(e);
//     }finally{

//     await client.close();
//     }
// }

// encontrarVenta();


// //Categorizar por atributo, en este caso "DNI_cliente" de forma descendente (1)

// async function encontrarVenta(nombreVenta){
//     const client = new MongoClient(uri);

//     try {
//         await client.connect();
//         const result = await client.db('sample_sales').collection('listingSales').
//         find({}).sort({dni_cliente: 1});

//         const result2= await result.toArray();
//         console.log(result2);
  
//     } catch (e) {
//         console.error(e);
//     }finally{

//     await client.close();
//     }
// }

// encontrarVenta();