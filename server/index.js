import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import adminRoutes from './routes/admin.js'


dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())




app.use("/admin",adminRoutes)



  


const PORT = process.env.PORT || 3001
// mongoose.set("strictQuery", false);
let connections = mongoose.connect(process.env.MONGO_URL)

app.listen(PORT,()=>{
    try{
        connections
        console.log(`Server Connected With DataBase ${PORT}`)
    }
    catch(err){
    console.log("Somethning Wents Wrong",err)
    }
})

  