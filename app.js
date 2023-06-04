const express=require('express');
const {MongoClient, ObjectId} = require('mongodb')
const bodyParser=require('body-parser');
const responApi=require('./Router/index')

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());



app.get('/', (req, res)=>{
    res.send('Hello word')
})

responApi(app); // llamado desde el index.js donde estan todos los require de cada modulo

// app.use('/movies', require('./Router/movies.js'));




app.listen(80, ()=>{
    console.log('Server in line')
});




// async function main(){
//     const uri = 'mongodb+srv://decruz82:admin@cluster0.bmv0nsj.mongodb.net/?retryWrites=true&w=test'

//     const client = new MongoClient(uri);

//     try{
//         await client.connect(); //El cliente se conecta
//         const listadoBasesDeDatos = await client.db().admin().listDatabases();
//         console.log("Los nombres de las bases de datos son: ")
//         listadoBasesDeDatos.databases.forEach(db => console.log(db.name))

//     }catch(e){ //Mostrar error
//         console.error(e)

//     }finally{
//         client.close(); //Se cierra la conexión

//     }
// }

// main().catch(); 