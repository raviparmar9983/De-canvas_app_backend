import { Document } from "mongoose";

interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    isVerified:boolean,
    passwordForgotToken:string,
    passwordTokenExprie:number
}

export default IUser;