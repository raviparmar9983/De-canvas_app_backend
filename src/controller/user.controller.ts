import { Request,Response,NextFunction } from "express";
import { Controller, controller, httpGet,request,response,next, httpPost } from "inversify-express-utils";
import { UserService } from "../services/user.service";
import { inject } from "inversify";
import { TYPES } from "../constants/type";
import IUser from "../interfaces/user.interface";

@controller('/user')
class  UserController{
    private userService:UserService
    constructor(@inject<UserService>(TYPES.UserService)userService:UserService){
        this.userService=userService;
    }
    @httpPost('/signup')
    private async signUp(@request()req:Request,@response()res:Response,@next()next:NextFunction){
        try{
            const {name,email,password,confirmPassword}=req.body;
            if(!name || !email || !password || !confirmPassword){
                throw new Error('email , name , password and confirmpasword is required')
            }
            const new_user=await this.userService.createUser(({name,email,password,confirmPassword} as IUser))
            res.status(200).json({
                status:'success',
                user:new_user
            })
        }
        catch(err:any){
           res.status(500).json({
                message:err.message,
                err
           })
        }
    } 
    @httpPost('/login')
    private async login(@request()req:Request,@response()res:Response,@next()next:NextFunction){
        try {
            const {email,password}=req.body
            if(!email || !password){
                throw new Error('email and password are required')
                
            }
            const token=await this.userService.login(email,password);
            if(!token){
                throw new Error('somthing went wrong')
                
            }
                                    
            res.status(200).json({
                status:'suceess',
                token
            })
        } 
        catch(err:any) {
           res.status(500).json({
                message:err.message
            })
        }
    }
}