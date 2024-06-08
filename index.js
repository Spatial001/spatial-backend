import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import morgan from 'morgan';
import fs from "fs"
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express'
import urlDocker from "./config/config.js"
import userRoutes from './routes/users.js'
import postRoutes from "./routes/post.js"
import multer from "multer"


dotenv.config();
dotenv.config({ path: '.env.server' })
const PORT = process.env.PORT || 8080;
const path = process.env.SERVER ? "20.204.173.246" : "localhost"

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Memories",
            version: "1.0.0",
            description: "Backend server for five-chan"
        },
        servers: [
            {
                url: `http://${path}:${PORT}`
            }
        ],

    },
    apis: ["./routes/*.js"]
}

const specs = swaggerJSDoc(options)
var upload = multer();

const app = express();
app.use(upload.array());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

app.use(express.json({ limit: 1000000 }))
app.use(cors());
app.use(morgan('common', {
    stream: fs.createWriteStream('./access.log', { flags: 'a' })
}));
app.use(morgan('dev'));

let url = urlDocker
// if (process.env.MODE == "production") url = urlDocker
// else url = process.env.ATLAS_URL
app.use('/', userRoutes)
app.use("/post", postRoutes)



await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }).then(
    app.listen(PORT, () => console.log(`${process.env.MODE}: Server Running on Port: http://localhost:${PORT} \nSwagger Running on: http://${path}:${PORT}/api-docs`))
).catch((err) => { console.log(err) })