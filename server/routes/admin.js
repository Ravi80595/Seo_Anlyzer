import express from "express"
import { websiteSeo } from "../Controllers/admin.js"



const router = express.Router()

router.post("/seo",websiteSeo)


export default router