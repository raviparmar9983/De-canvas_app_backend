import mongoose, { Schema, Types } from "mongoose";
import { Iproject } from "../interfaces/projectdetails.interface";


const projectSchema=new Schema<Iproject>({
    userId:{
        type:Schema.Types.ObjectId,
        required:[true,'user id is required'],
        unique:true
    },
    projectid:{
        type:Number,
        required:[true,'project id required ']
    },
    projectname:{
        type:String,
        required:[true,'your project name mus requiresd']
    } 
})


const Project=mongoose.model<Iproject>('Projects',projectSchema)

export default Project