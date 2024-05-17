import { Document } from "mongoose";

interface IUser extends Document{
    name:string,
    email:string,
    password:string,
    confirmPassword:string,
}

export default IUser;