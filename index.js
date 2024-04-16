import express from 'express';
import urlDocker from "./config/config.js"
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import userRoutes from './routes/users.js'

const app = express();
dotenv.config();
app.use(express.json())
app.use(cors());

let url
if (process.env.MODE == "production") url = urlDocker
else url = process.env.ATLAS_URL

app.use('/', userRoutes)
const PORT = process.env.PORT;

await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))
).catch((err) => { console.log(err) })