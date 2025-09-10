const express = require('express')
const app = express()
require('dotenv').config()
const cookieParser = require('cookie-parser')
const main = require('./Config/MongoDB')
const redisClient = require('./Config/RedisDB')
const authRouter= require('./Routes/AuthRouter')
const docRouter = require('./Routes/DocRouter')



app.use(express.json())
app.use(cookieParser())


app.use('/auth', authRouter)
app.use('/docs', docRouter)


const InitializeConnection = async ()=>{


    try {

        await Promise.resolve([main(), redisClient.connect()])
        console.log('DB connected successfully')

        app.listen(process.env.PORT, ()=>{
            console.log(`Server listening at PORT ${process.env.PORT}`)
        });
        
    } catch (error) {
        
        console.error(error.message)
    }
}


InitializeConnection()