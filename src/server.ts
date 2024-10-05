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
    app.use(cors())
    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.use(bodyParser.json())
}).setErrorConfig((app) => {
    app.use(errorController)
})

const app = server.build()
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("server startted on");
})