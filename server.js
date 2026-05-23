import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import { userRoutes, jobRoutes, applicationRoutes } from './routes/routes.js'


const app = express()

dotenv.config()
connectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cors(
    {
        origin: ["http://localhost:5173", "https://job-application-frontend-one.vercel.app/login"]
    }
))


// Routers Calling
app.use("/api/auth", userRoutes)
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))