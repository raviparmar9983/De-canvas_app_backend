import { inject,injectable, } from "inversify";
import mongoose, { Mongoose, NullExpression } from "mongoose";
import IUser from "../interfaces/user.interface";
import { TYPES } from "../constants/type";
import { next } from "inversify-express-utils";
import bcrypt from 'bcrypt'
import  Jwt  from "jsonwebtoken";
@injectable()
export class UserService{
    private userModel:mongoose.Model<IUser>
    constructor(@inject(TYPES.UserModel)userModel:mongoose.Model<IUser>){
        this.userModel=userModel;
    }
    public async createUser(user:IUser):Promise<IUser>{
        const {name,email,password,confirmPassword}=user;
        const exitst:IUser|null=await this.userModel.findOne({email});
        if(exitst){
            throw new Error(`use with this ${email} already exist`)
        }
        return await this.userModel.create({name,email,password,confirmPassword})
    }
    public async login(email:string,password:string):Promise<string|null>{
        const user:IUser|null=await this.userModel.findOne({email}).select('+password');
        if(!user){
            throw new Error('user with this emial  not existt')
            
        }
        if(!await bcrypt.compare(password,user.password)){
            throw new Error('password is incorrect')
        }   
        return  await Jwt.sign({email},process.env.SECRET_KEY!,{expiresIn:900000});
    }
}