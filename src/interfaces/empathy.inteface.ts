import { Document, Types } from "mongoose";

export interface IEmpathy extends Document{
    userId: Types.ObjectId,
    projectId: Types.ObjectId,
    user:string[],
    stackholder:string[],
    activities:string[],
    happy1:string[],
    sad1:string[],
    happy2:string[],
    sad2:[]
}