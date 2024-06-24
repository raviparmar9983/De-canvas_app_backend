import {injectable,inject} from 'inversify'
import { TYPES } from '../constants/type';
import mongoose from 'mongoose';
import { Iproject } from '../interfaces/projectdetails.interface';



@injectable()
class ProjectService{
    constructor(@inject(TYPES.projectModel)private projectModel:mongoose.Model<Iproject>){}
    
    public async create(project:Iproject):Promise<Iproject>{
        return await this.projectModel.create(project)
    }
    public async update(id:String,data:Iproject):Promise<any>{
        return await this.projectModel.updateOne({_id:id},{...data},{runValidators:true})
    }
    public async delete(id:string,session:mongoose.ClientSession):Promise<any>{
        return await this.projectModel.deleteOne({_id:id}).session(session)
    }
    public async getProject(userId:string):Promise<Iproject|null>{
        return await this.projectModel.findOne({userId})
    }
    
}

export default ProjectService