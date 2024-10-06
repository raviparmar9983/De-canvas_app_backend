import { inject } from "inversify";
import { controller, httpPost, request,response,next, httpGet } from "inversify-express-utils";
import { TYPES } from "../constants/type";
import { EmapthyService } from "../services/empathy.service";
import { NextFunction, Response,Request } from "express";
import { IEmpathy } from "@interface/empathy.inteface";



@controller('/user/empathy',TYPES.AuthenticationMiddleware,TYPES.projectAuthenticatorMiddlerWare)
class EmpathyController{
    constructor(@inject(TYPES.empathyService)private _empathyService:EmapthyService){}

    @httpPost('/')
    private async empathy(@request() req:Request,@response() res:Response,@next()next:NextFunction){
        try{
            const userId=req.userId!;
            const projectId=req.projectId!;
            const empathy:IEmpathy={...req.body}
            const created = await this._empathyService.createEmpathy(userId,projectId,empathy);
            res.status(200).json({
                created
            })
        }
        catch(err:any){
            next(err)
        }
    }
    @httpGet('/')
    private async getEmpathy(@request() req:Request,@response() res:Response,@next()next:NextFunction){
        try{
            const userId:string=req.userId!;
            const projectId:string=req.projectId!;
            const empathy=await this._empathyService.getEmpathy(projectId,userId);
            res.status(200).json({
                data:empathy[0]
            })
        }
        catch(err:any){
            next(err)
        }
    }
    @httpGet('/pdf')
    private async getEmapthyPdf(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
        try {

            const userId:string=req.userId!;
            const projectId:string=req.projectId!;
            const pdfBuffer = await this._empathyService.getEmpathyPdf(projectId)
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="AEIOU_Summary.pdf"',
            });
            res.send(Buffer.from(pdfBuffer!));
        }
        catch (err: any) {
            throw err
        }
    }
}