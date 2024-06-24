import { inject, injectable } from "inversify";
import { IAeiou } from "../interfaces/aeiou.interface";
import { TYPES } from "../constants/type";
import mongoose, { Types } from "mongoose";

@injectable()
 class AeiouService {
    private aeiouModel: mongoose.Model<IAeiou>
    constructor(@inject(TYPES.aeiouModel) aeoiuModel: mongoose.Model<IAeiou>) {
        this.aeiouModel = aeoiuModel;
    }
    public async workingonAeiou(userId: string, data: IAeiou) {
        const exist: IAeiou | null = await this.aeiouModel.findOne({ userId })
        const newdata: IAeiou = data
        if (exist) {
            return await this.aeiouModel.updateOne({ userId }, {...data}, { runValidators: true })
        }
        else {
            newdata.userId = new Types.ObjectId(userId)
            return await this.aeiouModel.create(newdata)
        }
    }
    public async getAeiou(userId: string) { 
        return await this.aeiouModel.aggregate([
            { $match: { userId } },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'projectId',
                    foreignField: '_id',
                    as: 'project'
                }
            },
            {
                $replaceRoot: {
                    newRoot: { $mergeObjects: [{ $first: '$project' }, '$$ROOT'] }
                }
            },
            {
                $project: {
                    project: 0,
                    __v: 0,
                    createdBy: 0,
                    updatedAt: 0,
                    createdAT: 0
                }
            }
        ])
    }
}

export default AeiouService