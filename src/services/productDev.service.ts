import { IproductDev } from "@interface/prouduct_dev.interface";
import { inject, injectable } from "inversify";
import mongoose, { Types } from "mongoose";
import { TYPES } from "../constants/type";


@injectable()
export class ProductDevService {

    constructor(@inject(TYPES.productDevModel) private _productDevModel: mongoose.Model<IproductDev>) { }

    async createProductDev(userId: string, projectId: string, productDev: IproductDev) {
        const exist = await this._productDevModel.findOne({ projectId })
        if (exist) {
            return await this._productDevModel.updateOne({ projectId }, { ...productDev }, { runValidators: true })
        }
        productDev.userId = new Types.ObjectId(userId)
        productDev.projectId = new Types.ObjectId(projectId)
        return await this._productDevModel.create({ ...productDev, userId, projectId })
    }
    async getProductDev(projectId: string, userId: string) {
        return this._productDevModel.aggregate([
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