import { BaseMiddleware, params } from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import IUser from "../interfaces/user.interface";
import { TYPES } from "../constants/type";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Iproject } from "../interfaces/projectdetails.interface";



@injectable()
export class ProjectAuthenticatorMiddlerWare extends BaseMiddleware{
    @inject(TYPES.projectModel)projectmodel!:mongoose.Model<Iproject>
    async handler(req: Request,res: Response, next: NextFunction):Promise<void> {
        try{
            const userId:string=req.userId!;
            const project:Iproject|null=await this.projectmodel.findOne({userId});
            if(!project)throw new Error('please create project first')
            req.projectId=project._id;
            next()
        }catch(err:any){
            res.status(500).json({
                message:err.message,
                stack:err.stack
            })
        }
    }
}