import { Controller, controller, httpGet, request, response, next, TYPE, httpPost, httpPatch, httpDelete, requestParam } from "inversify-express-utils";
import { TYPES } from "../constants/type";
import { inject } from "inversify";
import ProjectService from "../services/project.service";
import { NextFunction, Request, Response } from "express";
import { Iproject } from "../interfaces/projectdetails.interface";
import mongoose, { Types, mongo } from "mongoose";
import CustomeError from "../utils/custome.Error";
import aeiouModel from "../models/aeiou.model";
import ideationModel from "@model/ideation.model";

@controller('/user/project', TYPES.AuthenticationMiddleware)
class ProjectController {

    constructor(@inject(TYPES.prjectservice) private projectService: ProjectService) { }

    @httpGet('/')
    private async getProject(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
        try {
            const project: Iproject | null = await this.projectService.getProject(req.userId!);
            if (!project) {
                return next(new CustomeError(404, 'no project found please create it first'))
            }
            res.status(200).json({
                status: 'success',
                project
            })
        }
        catch (err: any) {
            next(err)
        }
    }
    @httpPost('/')
    private async createProject(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            const data: Iproject = (req.body as Iproject)
            data.userId = new Types.ObjectId(req.userId)!;
            const newProject: Iproject = await this.projectService.create(data)
            await aeiouModel.create({ userId: req.userId, projectId: newProject.id })
            await ideationModel.create({ userId: req.userId, projectId: newProject._id })
            await session.commitTransaction()
            res.status(201).json({
                status: 'Success',
                newProject
            })
        }
        catch (err: any) {
            await session.abortTransaction()
            next(err)
        }
        finally {
            await session.endSession()
        }
    }

    @httpPatch('/:id', TYPES.projectAuthenticatorMiddlerWare)
    private async updateProject(@requestParam('id') id: string, @request() req: Request, @response() res: Response, @next() next: NextFunction) {

        try {
            const data: Iproject = (req.body as Iproject)
            const updated: Iproject = await this.projectService.update(id, data)
            res.status(200).json({
                updated
            })
        }
        catch (err: any) {
            next(err)
        }
    }
    @httpDelete('/:id', TYPES.projectAuthenticatorMiddlerWare)
    private async deleteProjec(@requestParam('id') id: string, @request() req: Request, @response() res: Response, @next() next: NextFunction) {
        const session = await mongoose.startSession();
        session.startTransaction()
        try {
            const delere: any = await this.projectService.delete(id, session);
            ////// ON PROJECT DELETE DELETE THE CANVAS REFERES TO THAT PROJECT ALSO 
            //    await aeiouModel.deleteOne({projectId:id});

            await session.commitTransaction()
            res.status(204).json({
                message: 'Deleted successfully'
            })
        }
        catch (err: any) {
            await session.abortTransaction()
            next(err)
        }
        finally {
            await session.endSession();
        }
    }
}