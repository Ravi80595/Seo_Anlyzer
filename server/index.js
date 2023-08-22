import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import adminRoutes from './routes/admin.js'


dotenv.config()
const app = express()
app.use(express.json())

// app.use(cors({
//     origin: 'http://localhost:3000/' // Replace with your frontend domain
// }));



// app.use(cors())

app.use(cors({
    origin: '*'
}));

app.use(cors({
    origin: 'https://seo-anlyzer.vercel.app'
}));

// app.use("/",(req,res)=>{
//     res.status(200).send("Welcome To SEO anylazer api")
// })

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

  