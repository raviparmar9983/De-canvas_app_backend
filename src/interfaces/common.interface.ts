import { Types } from "mongoose"

export interface common {
    createdBy: Types.ObjectId,
    createdAT: Date,
    updatedBy: Types.ObjectId,
    updatedAt: Date
}