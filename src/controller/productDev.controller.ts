import { controller,request,response,next, httpPost, httpGet } from "inversify-express-utils";
import { ProductDevService } from "../services/productDev.service";
import { Request,Response,NextFunction } from "express";
import { TYPES } from "../constants/type";
import { inject } from "inversify";


@controller('/user/product-dev',TYPES.AuthenticationMiddleware,TYPES.projectAuthenticatorMiddlerWare)
class ProduceDev{
    constructor(@inject(TYPES.productDevService)private _productDevService:ProductDevService){}
    @httpPost('/')
    private async createEmpathy(@request()req:Request,@response()res:Response,@next()next:NextFunction) {
        try{
            const userId=req.userId!;
            const projectId=req.projectId!;
            const productDev={...req.body}
            const created = await this._productDevService.createProductDev(userId,projectId,productDev);
            res.status(201).json({
                created
            })
        }
        catch(err:any){
            next(err)
        }
    }
    @httpGet('/')
    private async getProductDev(@request()req:Request,@response()res:Response,@next()next:NextFunction){
        try{
            const userId:string=req.userId!;
            const projectId:string=req.projectId!;
            const productDev=await this._productDevService.getProductDev(projectId,userId);
            res.status(200).json({
                data:productDev[0]
            })
        }
        catch(err:any){
            next(err)
        }
    }
}