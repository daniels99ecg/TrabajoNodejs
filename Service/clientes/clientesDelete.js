const {MongoClient,ObjectId}=require('mongodb')
const uri='mongodb+srv://valeria:admin@cluster0.wcriixv.mongodb.net/?retryWrites=true&w=majority'
const bodyParser = require('body-parser')


class ClientesDelete {

    constructor(){}

async deleteOne (id){


            const client = new MongoClient(uri)

            try {
                await client.connect()
                const result = await client.db('Publigrafit2').collection('Clientes').deleteOne({_id:new ObjectId(id)})
                return result
            
            } catch (error) {
                console.log(error)
            }finally{
            await client.close();
            }
}

async deleteMany(body){


    const client = new MongoClient(uri)

                    try {
                        await client.connect()
                        const result = await client.db('Publigrafit2').collection('Clientes').deleteMany(body)
                        return result
                    } catch (error) {
                        console.log(error)
                    }finally{
                    
                    }
}
}
module.exports=ClientesDelete;
