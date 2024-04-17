import express from 'express';
import urlDocker from "./config/config.js"
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import fs from "fs"
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express'
import dotenv from 'dotenv'
import userRoutes from './routes/users.js'
import postRoutes from "./routes/post.js"

const PORT = process.env.PORT || 8080;
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "five-chan",
            version: "1.0.0",
            description: "Backend server for five-chan"
        },
        servers: [
            {
                url: `http://localhost:${PORT}`
            }
        ],
    },
    apis: ["./routes/*.js"]
}
const specs = swaggerJSDoc(options)

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

dotenv.config();
app.use(express.json())
app.use(cors());
app.use(morgan('common', {
    stream: fs.createWriteStream('./access.log', { flags: 'a' })
}));
app.use(morgan('dev'));

let url
if (process.env.MODE == "production") url = urlDocker
else url = process.env.ATLAS_URL

app.use('/', userRoutes)
app.use("/post", postRoutes)

await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(
    app.listen(PORT, () => console.log(`${process.env.MODE}: Server Running on Port: http://localhost:${PORT}`))
).catch((err) => { console.log(err) })