const {MongoClient,ObjectId}=require('mongodb')
const uri='mongodb+srv://valeria:admin@cluster0.wcriixv.mongodb.net/?retryWrites=true&w=majority'
const bodyParser = require('body-parser')


class ClientesInsertar {

    constructor(){}

async insertMany (nombre, apellido, telefono, direccion, email){


            const client = new MongoClient(uri)

            try {
                await client.connect()
                const result = await client.db('Publigrafit2').collection('Clientes').insertMany([{

                    'name': nombre,
                    'lastname': apellido,
                    'telephone':telefono,
                    'address':direccion,
                    'email':email

                }])
                return result
            
            } catch (error) {
                console.log(error)
            }finally{
            await client.close();
            }
}
}
module.exports=ClientesInsertar;
