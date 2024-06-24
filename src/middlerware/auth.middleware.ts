import { BaseMiddleware, params } from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import IUser from "../interfaces/user.interface";
import { TYPES } from "../constants/type";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import StatusConstants from "../constants/status.constant";
import CustomeError from "../utils/custome.Error";

declare module 'express' {
    interface Request { 
        userId?: string,
        name?: string,
        email?: string,
        projectId?: string
    }
}

@injectable()
export class AuthenticateMiddlerWare extends BaseMiddleware {

    @inject(TYPES.UserModel) private userModel!: mongoose.Model<IUser>

    async handler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
            const authheaders = req.headers.authorization?.split(' ')[1];
            if (!authheaders) throw new CustomeError(StatusConstants.NOT_FOUND.httpStatusCode,'token missing please login again');
            const payload = jwt.verify(authheaders, process.env.SECRET_KEY!)
            const email = (payload as JwtPayload).email;
            const user: IUser | null = await this.userModel.findOne({ email })
            if (!user) throw new CustomeError(StatusConstants.FORBIDDEN.httpStatusCode,'invalid token')
            req.userId = user._id;
            req.email = email;
            req.name = user.name
            next()
        } catch (err: any) {
            next(err)
        }
    }
}