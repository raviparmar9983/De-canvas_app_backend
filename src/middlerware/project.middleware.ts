import { BaseMiddleware, params } from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { TYPES } from "../constants/type";
import { Iproject } from "../interfaces/projectdetails.interface";
import StatusConstants from "../constants/status.constant";
import CustomeError from "../utils/custome.Error";



@injectable()
export class ProjectAuthenticatorMiddlerWare extends BaseMiddleware {
    @inject(TYPES.projectModel) projectmodel!: mongoose.Model<Iproject>
    async handler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId: string = req.userId!;
            const project: Iproject | null = await this.projectmodel.findOne({ userId });
            if (!project) throw new CustomeError(StatusConstants.NOT_FOUND.httpStatusCode,'please create project first')
            req.projectId = project._id;
            next()
        } catch (err: any) {
            next(err)
        }
    }
}