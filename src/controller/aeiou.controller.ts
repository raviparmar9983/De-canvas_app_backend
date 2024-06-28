import { controller, httpPost ,request,response,next, httpGet} from "inversify-express-utils";
import  AeiouService  from "../services/aeiou.service";
import { inject } from "inversify";
import { Types } from "mongoose";
import { TYPES } from "../constants/type";
import { Request,Response,NextFunction } from "express";
import { IAeiou } from "../interfaces/aeiou.interface";
import StatusConstants from "../constants/status.constant";
import CustomeError from "../utils/custome.Error";

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
            let canvas= await this.aeiouService.getAeiou(req.userId!)
            res.status(201).json({
                Aeiou:canvas
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
            let canvas= await this.aeiouService.getAeiou(req.userId!)
            if(canvas.length==0){
               return next(new CustomeError(StatusConstants.NOT_FOUND.httpStatusCode,"AEIOU canvas is not found please create first")) 
            }
            res.status(200).json({
                Aeiou:canvas[0]
            })
        }
        catch(err:any){
            next(err)
        }
    }
}