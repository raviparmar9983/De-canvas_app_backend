import { Document, Schema, Types } from "mongoose";
import { common } from "./common.interface";


export interface Iideation extends Document, common {
    projectId: Types.ObjectId,
    people: string[],
    activity: string[],
    context: string[],
    props: string[]
}