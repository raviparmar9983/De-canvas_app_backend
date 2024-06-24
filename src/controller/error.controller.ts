import { Request, Response, NextFunction } from "express";



export default (err:any,req:Request,res:Response,next:NextFunction)=>{
    err.status=err.status || 500
    err.message=err.message || 'Internal Server Error'

    if(process.env.ENV=='development'){
        res.status(err.status).json({
            name:err.name,
            message:err.message,
            stack:err.stack,
        })
    
    }
    else{
        res.status(err.status).json({
            name:err.name,
            message:err.message,    
        })
    }
}