import { Controller, controller, httpGet ,request,response,next, TYPE, httpPost, httpPatch, httpDelete, requestParam} from "inversify-express-utils";
import { TYPES } from "../constants/type";
import { inject } from "inversify";
import { ProjectService } from "../services/project.service";
import { NextFunction, Request ,Response} from "express";
import { Iproject } from "../interfaces/projectdetails.interface";
import { Types } from "mongoose";

@controller('/user/project',TYPES.AuthenticationMiddleware)
class ProjectController{
    
    constructor(@inject(TYPES.prjectservice)private projectService:ProjectService  ) {}

    @httpGet('/')
    private async getProject(@request()req:Request,@response()res:Response,@next()next:NextFunction){
        try{
            const project:Iproject|null=await this.projectService.getProject(req.userId!);
            if(!project){
                res.status(404).json({message:'not founs please create project'})
                return;
            }
            res.status(200).json({
                status:'success',
                project
            })
        }
        catch(err:any){
            res.status(500).json({
                name:err.name,
                message:err.message,
                stack:err.stack
            })
        }
    }   
    @httpPost('/')
    private async createProject(@request()req:Request,@response()res:Response,@next()next:NextFunction){
        try{
            const data:Iproject=(req.body as Iproject)
            data.userId=new Types.ObjectId(req.userId)!;
            const newProject:Iproject=await this.projectService.create(data)
            return newProject;
        }
        catch(err:any){
            res.status(500).json({
                status:'success',
                name:err.name,
                message:err.message,
                stack:err.stack
            })
        }
    }

    @httpPatch('/:id',TYPES.projectAuthenticatorMiddlerWare)
    private async updateProject(@requestParam('id')id:string,@request()req:Request,@response()res:Response,@next()next:NextFunction){
        try{
            const data:Iproject=(req.body as Iproject)
            const updated:Iproject=await this.projectService.update(id,data)
            res.status(200).json({
                updated
            })
        }
        catch(err:any){
            res.status(500).json({
                status:'success',
                name:err.name,
                message:err.message,
                stack:err.stack
            })
        }
    }
    @httpDelete('/:id')
    private async deleteProjec(@requestParam('id') id: string,@request()req:Request,@response()res:Response,@next()next:NextFunction){
        try{
           const delere:any=await this.projectService.delete(id);
           res.status(200).json({
            message:'Deleted successfully'
           })



           ////// ON PROJECT DELETE DELETE THE CANVAS REFERES TO THAT PROJECT ALSO 
        }
        catch(err:any){
            res.status(500).json({
                status:'success',
                name:err.name,
                message:err.message,
                stack:err.stack
            })
        }
    }
}