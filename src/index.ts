import 'reflect-metadata'
import * as bodyParser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config({ path: './src/config.env' })
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./inversify.config";
import mongoose from 'mongoose';
import errorController from './controller/error.controller';
import cors from 'cors'

mongoose.connect(process.env.CONN_STR!).then(() => {
    console.log("connected successfully");
})


const server = new InversifyExpressServer(container, null, { rootPath: '/de-canvas' });

server.setConfig((app) => {
    app.use(cors({

        origin: ['https://de-canvas-frontend.vercel.app/','https://de-canvas-frontend.vercel.app/#/', 'http://localhost:4200/', 'http://localhost:4200/#/'], // Replace with your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
        credentials: true // Enable credentials if you need to send cookies or authorization headers

    }))
    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.use(bodyParser.json())
    app.get(/, "api server working fine!");
}).setErrorConfig((app) => {
    app.use(errorController)
})

const app = server.build()
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("server startted on");
})
