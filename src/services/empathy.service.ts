import { IEmpathy } from "@interface/empathy.inteface";
import { inject, injectable } from "inversify";
import mongoose, { Mongoose } from "mongoose";
import { TYPES } from "../constants/type";




@injectable()
export class EmapthyService {
    constructor(@inject(TYPES.empathyModel) private _emparhyModel: mongoose.Model<IEmpathy>) { }

    public async createEmpathy(userId: string, projectId: string, empathy: IEmpathy): Promise<any> {
        const exist: IEmpathy | null = await this._emparhyModel.findOne({ projectId });
        if (exist) {
            return await this._emparhyModel.updateOne({ projectId }, { ...empathy }, { runValidators: true });
        }
        empathy.userId = new mongoose.Types.ObjectId(userId);
        empathy.projectId = new mongoose.Types.ObjectId(projectId);
        return await this._emparhyModel.create(empathy);
    }
    public async getEmpathy(projectId: string, userId: string) {
        return this._emparhyModel.aggregate([
            {
                $match: {
                    projectId
                }
            },
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
