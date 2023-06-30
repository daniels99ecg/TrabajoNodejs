const {MongoClient,ObjectId}=require('mongodb')
const uri='mongodb+srv://valeria:admin@cluster0.wcriixv.mongodb.net/?retryWrites=true&w=majority'
const bodyParser = require('body-parser')


class comprasInsertar {

    constructor(){}

async insertMany (proveedor, cantidad, fecha, total){


            const client = new MongoClient(uri)

            try {
                await client.connect()
                const result = await client.db('Publigrafit2').collection('Compras').insertMany([{

                    'supplier': proveedor,
                    'amount': cantidad,
                    'date': new Date(),
                    'total' : total,
                }])
                return result
            
            } catch (error) {
                console.log(error)
            }finally{
            await client.close();
            }
}
}
module.exports=comprasInsertar;
