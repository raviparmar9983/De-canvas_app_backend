import mongoose, { Schema, Document, Types } from "mongoose";
import { IAeiou } from "../interfaces/aeiou.interface";
import StatusConstants from "../constants/status.constant";

export const aeiouSchema = new Schema<IAeiou>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user id is required'],
        unique: true
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Projects',
        required: [true, 'project must required'],
        unique: true
    },
    activity: {
        type: [String],
        default: []
    },
    intrection: {
        type: [String],
        default: []
    },
    object: {
        type: [String],
        default: []
    },
    environment: {
        type: [String],
        default: []
    },
    user: {
        type: [String],
        default: []
    }
})



const aeiouModel = mongoose.model<IAeiou>('aeiou', aeiouSchema);

export default aeiouModel