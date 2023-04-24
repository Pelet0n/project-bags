const jwt = require('jsonwebtoken')
require('dotenv').config()

const isAuth = (req,res,next) =>{
    const authorization = req.headers.authorization || ""
    
    const [sign, token] = authorization.split(" ")

    if(sign !== "bearer"){
        return res.json("Sign must be bearer!")
    }

    jwt.verify(token,process.env.SECRET_CODE,(err,decoded)=>{
        if(err) return res.json("Failed to verify token " + err)
        console.log(decoded)
        next()   
    })
    

}

module.exports = isAuth