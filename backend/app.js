const express = require('express')
const mongoose = require('mongoose')
const connectMongo = require('./connect_mongo')
const bodyparser = require('body-parser')
const Team = require('./schema/Team')
const Admin = require('./schema/Admin')
const bcrypt = require('bcrypt')
const app = express()
const cors = require('cors')
const JWT = require('jsonwebtoken')
const isAuth = require('./middleware')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'public/files')
    },
    filename: (req,file,cb)=>{
        console.log(file)
        cb(null,file.originalname)
    }
})

const upload = multer({storage:storage}) 

require('dotenv').config()

const PORT = process.env.PORT
const SALT = 10

app.use(cors())
app.use(express.json())

connectMongo()

app.post("/populate",isAuth,async (req,res)=>{

    const teams = await Team.create(req.body).catch(e=>console.log(e))
    
    console.log(req.body)

    if(!teams){
        return res.json("Error occured")
    }

    return res.json("Udało się wprowadzić dane")
})

app.get("/teams",async(req,res)=>{
    const teams = await Team.find({})
    console.log(teams)
    return res.json(teams)
})

app.get('/team',async(req,res)=>{
    const name = req.body.name

    
    const team = await Team.findOne({'name':name}).catch((e)=>console.log(e))
    

    return res.json(team)
})


app.post('/update',async(req,res)=>{
    const points = req.body.points
    const question = req.body.question

    for(const [v,k] of Object.entries(points)){
        try{
            const update = await Team.findOneAndUpdate({name:v},{[question]: k})
            console.log(v,k,question)
            
        }
        catch(e){
            console.error(e)
        }
    }

    return res.json("OK")

})

app.post('/login',async(req,res)=>{
    const {login, password} = req.body

    const admin = await Admin.findOne({login:login})

    if(admin){
        const match = await bcrypt.compare(password,admin.password)

        if(!match){
            return res.json({
                'message': "Invalid password",
                'token': null
            })
        }
        const token = JWT.sign({
            id: admin.id,
            password: admin.password
        },process.env.SECRET_CODE,{
            expiresIn: Date.now() + 10000
        })

        return res.json({
            'message': "Login succesfull",
            'token': token
        })
    }

   return res.json({
        'message': "Invalid user",
        'token': null
   })

})

app.post('/createuser',isAuth,async(req,res)=>{
    const {login, password} = req.body

    if(await Admin.findOne({login:login})){
        return res.json("User with that login was already registered")
    }

    try{
        const hashed = await bcrypt.hash(password,SALT)

        const admin = new Admin({
            login:login,
            password:hashed
        })
    
        await admin.save()

        res.json({"message": "User created succesfully"})
    }
    catch(err){
        res.json("Failed to create user")
    }

})

app.post('/testpost',upload.single('file'),(req,res)=>{
    console.log("ujdhasiod")
    return res.json("udało się przesłać plik")
}) 

app.get('/download',(req,res)=>{

    if(!req.query.filename){
        console.log(fs.readdirSync('public/files'))
        return res.json(fs.readdirSync('public/files'))
    }

    const file = `public/files/${req.query.filename}`

    res.download(file)

})

app.listen(PORT,()=>{
    console.log(`App started at port ${PORT}`)
})