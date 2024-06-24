import { Document, Types } from "mongoose";
import { common } from "./common.interface";

export interface IAeiou extends Document {
    userId: Types.ObjectId,
    projectId: Types.ObjectId,
    activity: string[],
    environment: string[],
    intrection: string[],
    user: string[],
    object: string[],

}
