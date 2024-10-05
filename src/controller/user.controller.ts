import { Request, Response, NextFunction } from "express";
import { controller, httpGet, request, response, next, httpPost, requestParam } from "inversify-express-utils";
import UserService from "../services/user.service";
import { inject } from "inversify";
import { TYPES } from "../constants/type";
import IUser from "../interfaces/user.interface";
import StatusConstants from "../constants/status.constant";
import CustomeError from "../utils/custome.Error";
import mongoose from "mongoose";
import EmailVerification from "../models/email.verification";
import sendmail from "../utils/email";
import { verifyAccountTemplate } from "../templates";

@controller('/user')
class UserController {
    private userService: UserService
    constructor(@inject<UserService>(TYPES.UserService) userService: UserService) {
        this.userService = userService;
    }
    @httpPost('/signup')
    private async signUp(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { name, email, password, confirmPassword } = req.body;
            if (!name || !email || !password || !confirmPassword) {
                throw new CustomeError(400, 'email , name , password and confirmpasword is required')
            }
            const token = await this.userService.createUser(({ name, email, password, confirmPassword } as IUser), session)
            const emailsend = await EmailVerification.findOneAndUpdate({ email }, { token }, { session, new: true, upsert: true })
            const link = `localhost:4200/verify;token=${token}`;
            const option = {
                email,
                subject: `Verify your account`,
                html: verifyAccountTemplate(link)
            }
            sendmail(option)
            await session.commitTransaction()
            res.status(200).json({
                status: 'success',
                message: 'verification link send on your email'
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
    @httpGet('/verify/:token')
    public async verify(@requestParam('token') token: string, @request() req: Request, @response() res: Response, @next() next: NextFunction) {
        try {
            if (!token) throw new CustomeError(StatusConstants.RESOURCE_NOT_FOUND.httpStatusCode, 'token is missing')
            const newToken = await this.userService.verifyUser(token)
            res.status(200).json({
                status: 'success',
                token: newToken
            })
        }
        catch (err) {
            next(err);
        }
    }
    @httpPost('/login')
    private async login(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                throw new CustomeError(StatusConstants.BAD_REQUEST.httpStatusCode, 'email and password are required')
            }
            const token = await this.userService.login(email, password);
            if (!token) {
                throw new CustomeError(StatusConstants.INTERNAL_SERVER_ERROR.httpStatusCode, 'somthing went wrong')
            }
            res.status(200).json({
                status: 'suceess',
                token
            })
        }
        catch (err: any) {
            next(err)
        }
    }
    @httpPost('/forgotpassword')
    private async forgotPassword(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
        try {
            const { email } = req.body;
            if (!email) return next(new CustomeError(StatusConstants.FORBIDDEN.httpStatusCode, 'email is required'))
            const result = await this.userService.forgotPassword(email);
            res.status(200).json({
                result
            })
        }
        catch (err: any) {
            next(err)
        }
    }
    @httpPost('/resetpassword/:token')
    private async resetPassword(@requestParam('token') token: string, @request() req: Request, @response() res: Response, @next() next: NextFunction) {
        try {
            if (!token) throw new CustomeError(StatusConstants.BAD_REQUEST.httpStatusCode, 'Toekn is missing')
            const { password, confirmPassword } = req.body;
            if (!password || !confirmPassword) throw new CustomeError(StatusConstants.BAD_REQUEST.httpStatusCode, 'password and confrim password is required')
            const newToken = await this.userService.resetPassword(token, password, confirmPassword)
            res.status(200).json({
                token: newToken
            })
        }
        catch (err: any) {
            throw err
        }
    }
}