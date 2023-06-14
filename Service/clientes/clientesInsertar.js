const {MongoClient,ObjectId}=require('mongodb')
const uri='mongodb+srv://valeria:admin@cluster0.wcriixv.mongodb.net/?retryWrites=true&w=majority'
const bodyParser = require('body-parser')


class ClientesInsertar {

    constructor(){}

async insertMany (body){


            const client = new MongoClient(uri)

            try {
                await client.connect()
                const result = await client.db('Publigrafit2').collection('Clientes').insertMany([body])
                return result
            
            } catch (error) {
                console.log(error)
            }finally{
            await client.close();
            }
}
}
module.exports=ClientesInsertar;
