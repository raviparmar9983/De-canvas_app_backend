import 'reflect-metadata'
import * as bodyParser  from 'body-parser'
import dotenv from 'dotenv'
dotenv.config({path:'./src/config.env'})
import { interfaces,InversifyExpressServer,TYPE } from "inversify-express-utils";
import { NextFunction,Request,Response } from 'express';
import container from "./inversify.config";
import mongoose from 'mongoose';

mongoose.connect(process.env.CONN_STR!).then(()=>{
    console.log("connected successfully");
})


const server=new InversifyExpressServer(container,null,{rootPath:'/de-canvas'});

server.setConfig((app)=>{
    app.use(bodyParser.urlencoded({
        extended:true
    }))
    app.use(bodyParser.json())
}).setErrorConfig((app)=>{
    app.use((err:any,req:Request,res:Response,next:NextFunction)=>{  
        res.status(500).json({
            message:err.message
        })
    })
}).build().listen(8080,'localhost',()=>{
    console.log('Server startted');
})