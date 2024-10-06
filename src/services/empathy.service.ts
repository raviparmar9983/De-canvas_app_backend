import { IEmpathy } from "@interface/empathy.inteface";
import { inject, injectable } from "inversify";
import mongoose, { Mongoose } from "mongoose";
import { TYPES } from "../constants/type";
import CustomeError from "@util/custome.Error";
import { generatePdf } from "@util/generatePDF";
import StatusConstants from "../constants/status.constant";
import { generateHtmlString } from "../templates/aeiouTemplate";
import { generateEmpathyHtmlString } from "../templates/empathy.template";




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
                    projectId: projectId
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
    public async getEmpathyPdf(projectId: string) {
        try {
            const canvas = await this.getEmpathy(projectId, '')
            if (canvas.length == 0) {
                throw new CustomeError(StatusConstants.NOT_FOUND.httpStatusCode, "AEIOU canvas is not found please create first")
            }
            const htmlString = generateEmpathyHtmlString(canvas[0]);
            const PDF = await generatePdf(htmlString,'A0',2.0);
            return PDF;
        }
        catch (error) {
            throw error
        }
    }
}
