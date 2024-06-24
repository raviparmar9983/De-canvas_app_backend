import { Document, Types } from "mongoose";


export interface Iproject extends Document {
    userId: Types.ObjectId,
    projectname: string,
    projectid: number,
}