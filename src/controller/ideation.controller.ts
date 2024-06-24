import { inject } from "inversify";
import { controller, httpPost ,request,response,next, httpGet} from "inversify-express-utils";
import { TYPES } from "../constants/type";
import IdeationService from "../services/ideation.service";
import { Request,Response,NextFunction } from "express";

@controller('/user/ideation',TYPES.AuthenticationMiddleware,TYPES.projectAuthenticatorMiddlerWare)
class IdeationController{
    constructor(@inject(TYPES.ideationService)private ideationService:IdeationService){}
    @httpPost('/')
    private async workingOnIdeation(@request()req:Request,@response()res:Response,@next()next:NextFunction){
        try{
            const userId=req.userId;
            const projectId:string=req.projectId!;
            const ideation = await this.ideationService.workingIdeation(projectId,req.body);
            res.status(200).json({
                ideation
            })
        }
        catch(err:any){
            next(err)
        }
    }
    @httpGet('/')
    private async getIdeation(@request()req:Request,@response()res:Response,@next()next:NextFunction){
        try{
            const userId:string=req.userId!;
            const projectId:string=req.projectId!;
            const ideation=await this.ideationService.getIdeation(projectId,userId);
            res.status(200).json({
                ideation
            })
        }catch(err:any){
            next(err)
        }
    }
}