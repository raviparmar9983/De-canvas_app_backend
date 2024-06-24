import { injectable,inject } from "inversify";
import { TYPES } from "../constants/type";
import { Iideation } from "../interfaces/ideation.interface";
import mongoose, { Types } from "mongoose";

@injectable()
class IdeationService {
    constructor(@inject(TYPES.ideationModel)private ideationModel:mongoose.Model<Iideation>){}
    public async workingIdeation(projectId:string,data:Iideation){
        const ideation:Iideation |null=await this.ideationModel.findOne({projectId});
        if(ideation){
            return await this.ideationModel.updateOne({projectId},{...data},{runValidators:true})
        }
        let newdata=data;
        newdata.projectId=new Types.ObjectId(projectId)
        return await this.ideationModel.create(newdata)
    }
    public async getIdeation(projectId:string,userID:string){
        return await this.ideationModel.aggregate([
            {$match: {
              projectId:projectId
            }},
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
                newRoot: {$mergeObjects:[{$first:'$project'},'$$ROOT']}
              }
            },{
              $project: {
                _id:0,
                result:0,
                createdAt:0,
                updatedAt:0
              }
            }
          ])
    }
}

export default IdeationService