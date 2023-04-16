const mongoose = require('mongoose')
require('dotenv').config()

async function connectMongo(){
    try{
        const connect = mongoose.connect(process.env.URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("Connected to mongo")
    }
    catch(err){
        console.log(err)
    }
}

module.exports = connectMongo