const {MongoClient,ObjectId}=require('mongodb')
const uri='mongodb+srv://valeria:admin@cluster0.wcriixv.mongodb.net/?retryWrites=true&w=majority'
const bodyParser = require('body-parser')


class ClientesFind{


    constructor(){}


    async find (){

        const client = new MongoClient(uri)
    
        try {
            await client.connect()
            const result = await client.db('Publigrafit2').collection('Clientes').find({}).toArray()
            return result
        
        } catch (error) {
            console.log(error)
        }finally{
        
        }

    }


    async findOne(id){

        const client = new MongoClient(uri)
        try {
            await client.connect()
            const result = await client.db('Publigrafit2').collection('Clientes').findOne({_id:new ObjectId(id)})
        
            return result
            
        } catch (error) {
            console.log(error)
        }finally{
        
        }
    }
}


module.exports = ClientesFind;