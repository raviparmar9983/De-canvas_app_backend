import { controller, httpPost ,request,response,next, httpGet} from "inversify-express-utils";
import { AeiouService } from "../services/aeiou.service";
import { inject } from "inversify";
import { Types } from "mongoose";
import { TYPES } from "../constants/type";
import { Request,Response,NextFunction } from "express";
import { IAeiou } from "../interfaces/aeiou.interface";
import { Iproject } from "../interfaces/projectdetails.interface";

@controller('/user/aeiou')
class AeiouController{
    private aeiouService:AeiouService
    constructor(@inject(TYPES.aeiouService)aeiouService:AeiouService){
        this.aeiouService=aeiouService;
    }
    @httpPost('/',TYPES.AuthenticationMiddleware,TYPES.projectAuthenticatorMiddlerWare)
    private async makeChanges(@request()req:Request,@response()res:Response,@next()next:NextFunction){
        try{
            const userId=req.userId;
            const data:IAeiou={...req.body}
            data.projectId=new Types.ObjectId(req.projectId!)
            const updated=await this.aeiouService.workingonAeiou(userId!,data)
            res.status(201).json({
                updated
            })
        }
        catch(err:any){
            res.status(500).json({
                message:err.message
            })
        }
    }
    @httpGet('/',TYPES.AuthenticationMiddleware,TYPES.projectAuthenticatorMiddlerWare)
    private async getAeiou(@request()req:Request,@response()res:Response,@next()next:NextFunction){
        try{
            const canvas= await this.aeiouService.getAeiou(req.userId!)
            res.status(200).json({
                status:"success",
                canvas
            })
        }
        catch(err:any){
            res.status(500).json({
                message:err.message
            })
        }
    }
}