import { injectable, inject } from "inversify";
import { TYPES } from "../constants/type";
import { Iideation } from "../interfaces/ideation.interface";
import mongoose, { Types } from "mongoose";
import CustomeError from "@util/custome.Error";
import { generatePdf } from "@util/generatePDF";
import StatusConstants from "../constants/status.constant";
import { generateHtmlString } from "../templates/aeiouTemplate";
import { generateIdeationHtmlString } from "../templates/ideation.template";

@injectable()
class IdeationService {
  constructor(@inject(TYPES.ideationModel) private ideationModel: mongoose.Model<Iideation>) { }
  public async workingIdeation(projectId: string, data: Iideation) {
    const ideation: Iideation | null = await this.ideationModel.findOne({ projectId });
    if (ideation) {
      return await this.ideationModel.updateOne({ projectId }, { ...data }, { runValidators: true })
    }
    let newdata = data;
    newdata.projectId = new Types.ObjectId(projectId)
    return await this.ideationModel.create(newdata)
  }
  public async getIdeation(projectId: string, userID: string) {
    return await this.ideationModel.aggregate([
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
          as: "project"
        }
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $first: '$project' }, '$$ROOT'] }
        }
      }, {
        $project: {
          _id: 0,
          result: 0,
          createdAt: 0,
          updatedAt: 0
        }
      }
    ])
  }
  public async getIdeationPdf(projectId: string) {
    try {
      const canvas = await this.getIdeation(projectId!, '')
      if (canvas.length == 0) {
        throw new CustomeError(StatusConstants.NOT_FOUND.httpStatusCode, "AEIOU canvas is not found please create first")
      }
      const htmlString = generateIdeationHtmlString(canvas[0]);
      const PDF = await generatePdf(htmlString,'A2',1.8,true);
      return PDF;
    }
    catch (error) {
      throw error
    }
  }
}

export default IdeationService