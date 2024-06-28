import { Document, Types } from "mongoose";

export interface IproductDev extends Document {
    userId: Types.ObjectId,
    projectId: Types.ObjectId,
    purpose_info:string[],
    product_expr:string[], 
    customer_revali:string[],
    product_fun:string[],
    product_feature:string[],
    people_info:string[],
    component_info:string[],
    reject:string[]    
}