import { inject, injectable } from "inversify";
import { IAeiou } from "../interfaces/aeiou.interface";
import { TYPES } from "../constants/type";
import mongoose, { Types } from "mongoose";
import CustomeError from "../utils/custome.Error";
import StatusConstants from "../constants/status.constant";
import { generateHtmlString } from "../templates/aeiouTemplate";
import { generatePdf } from "../utils/generatePDF";

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
            return await this.aeiouModel.updateOne({ userId }, { ...data }, { runValidators: true })
        }
        else {
            newdata.userId = new Types.ObjectId(userId)
            return await this.aeiouModel.create(newdata)
        }
    }
    public async getAeiou(projectId: string) {
        return await this.aeiouModel.aggregate([
            { $match: { projectId } },
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

    public async getAeiouPdf(projectId: string) {
        try {
            const canvas = await this.getAeiou(projectId!)
            if (canvas.length == 0) {
                throw new CustomeError(StatusConstants.NOT_FOUND.httpStatusCode, "AEIOU canvas is not found please create first")
            }
            const htmlString = generateHtmlString(canvas[0]);
            const PDF = await generatePdf(htmlString,'A2',1.8,true);
            return PDF;
        }
        catch (error) {
            throw error
        }
    }
}

export default AeiouService