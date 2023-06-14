const {MongoClient,ObjectId}=require('mongodb')
const uri='mongodb+srv://valeria:admin@cluster0.wcriixv.mongodb.net/?retryWrites=true&w=majority'
const bodyParser = require('body-parser')


class ClientesUpdate {

    constructor(){}

async updateOne (id, body){


            const client = new MongoClient(uri)

            try {
                await client.connect()
                const result = await client.db('Publigrafit2').collection('Clientes').updateOne({_id:new ObjectId(id)},{$set:{body}})
                return result
            
            } catch (error) {
                console.log(error)
            }finally{
            await client.close();
            }
}

async updateMany(body){


    const client = new MongoClient(uri)

                    try {
                        await client.connect()
                        const result = await client.db('Publigrafit2').collection('Clientes').updateMany({},{$set:{body}})
                    
                    return result
                    } catch (error) {
                        console.log(error)
                    }finally{
                    
                    }
}
}
module.exports=ClientesUpdate;
