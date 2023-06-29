const {MongoClient, ObjectId} = require('mongodb'); //Para poder trabajar con Id
const uri='mongodb+srv://ANDRES:admin@cluster0.zaeaoqe.mongodb.net/?retryWrites=true&w=majority';
const bodyParser =require('body-parser')

class insumosFind{


    constructor(){}


    async find (){


        const client=new MongoClient(uri);
    
        try {
            await client.connect();
            const result = await client.db('Publigrafit').collection('insumos').find({}).toArray();
            return result
        } catch (error) {
            console.log(error)
        }finally {
        
        }
    }

    async finOne(id){
        const client=new MongoClient(uri);
        
    
    try {
        await client.connect();
        const result = await client.db('Publigrafit').collection('insumos').findOne({_id:new ObjectId(id)});
        return result
    } catch (error) {
        console.log(error)
    }finally {
    
    }
    }
    
    async findlimit(){
        const client=new MongoClient(uri);
        
    
    try {
        await client.connect();
        const result = await client.db('Publigrafit').collection('insumos').find({}).skip(10).limit(10).toArray();
        return result
    } catch (error) {
        console.log(error)
    }finally {
    
    }
    }

    async findlookup(){
        const client=new MongoClient(uri);
        
    
    try {
        await client.connect();
        const result = await client.db('Publigrafit').collection('insumos').aggregate([{
            $lookup: {
                from:"ficha_tecnica",
                localField:"'_id'",
                foreignField:"'_id'",
                as:"Costo_insumo"


            }
            },{
                $limit:5
            },{
                $sort:{Costo_insumo:1}
            }

        ]).toArray();
        return result
    } catch (error) {
        console.log(error)
    }finally {
    
    }
    }
}


module.exports=insumosFind;