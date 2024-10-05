import mongoose, { Schema, model } from "mongoose";
import { Iideation } from "../interfaces/ideation.interface";
import Project from "./project.model";


const ideationSchema = new Schema<Iideation>({
    userId:{
        type:Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'User',
        default:undefined
    },
    projectId: {
        type: Schema.Types.ObjectId,
        required: [true, 'project must required for creating canvas'],
        unique: true
    },
    people: {
        type: [String],
        default: []
    },
    context: {
        type: [String],
        default: []
    },
    props: {
        type: [String],
        default: []
    },
    activity: {
        type: [String],
        default: []
    },

}, {
    timestamps: true
})


const ideationModel=mongoose.model<Iideation>('Ideation',ideationSchema);

export default ideationModel