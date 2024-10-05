import { inject, injectable, } from "inversify";
import mongoose, { ClientSession } from "mongoose";
import IUser from "../interfaces/user.interface";
import { TYPES } from "../constants/type";
import StatusConstants from "../constants/status.constant";
import Jwt from "jsonwebtoken";
import CustomeError from "../utils/custome.Error";
import sendmail from "../utils/email";
import EmailVerification from "../models/email.verification";
import crypto from 'crypto'
import { resetPaswordTemplate } from "../templates";

@injectable()
class UserService {
    private userModel: mongoose.Model<IUser>
    constructor(@inject(TYPES.UserModel) userModel: mongoose.Model<IUser>) {
        this.userModel = userModel;
    }
    public async createUser(user: IUser, session: ClientSession): Promise<string> {
        const { name, email, password, confirmPassword } = user;
        const exitst: IUser | null = await this.userModel.findOne({ email }).session(session);
        if (exitst && exitst.isVerified) {
            throw new CustomeError(StatusConstants.RESOURCE_ALREADY_EXISTS.httpStatusCode, `use with this ${email} already exist`)
        }
        if (exitst && !exitst.isVerified) {
            return await (exitst as any).otpGenerat()
        }
        const newUser = await this.userModel.create([{ name, email, password, confirmPassword }], { session })
        const token = crypto.randomBytes(32).toString('hex')
        const otpToken = crypto.createHash('sha256').update(token).digest('hex')
        return otpToken
    }
    public async login(email: string, password: string): Promise<string | null> {
        const user: IUser | null = await this.userModel.findOne({ email }).select('+password');
        if (!user) {
            throw new CustomeError(StatusConstants.UNAUTHORIZED.httpStatusCode, 'user with this emial  not existt')
        }
        if (!await (user as any).comparePassword(password)) {
            throw new CustomeError(StatusConstants.BAD_REQUEST.httpStatusCode, 'password is incorrect')
        }
        if (!user.isVerified) throw new CustomeError(StatusConstants.FORBIDDEN.httpStatusCode, 'please verify the email first')
        return Jwt.sign({ email }, process.env.SECRET_KEY!, { expiresIn: 900000 });
    }
    public async forgotPassword(email: string): Promise<string> {
        const user: IUser | null = await this.userModel.findOne({ email });
        if (!user) throw new CustomeError(StatusConstants.NOT_FOUND.httpStatusCode, 'user with this emial not exists')
        if (user && !user.isVerified) throw new CustomeError(StatusConstants.FORBIDDEN.httpStatusCode, 'please verify the email')
        const token = await (user as any).otpGenerat()
        user.passwordForgotToken = token
        user.passwordTokenExprie = Date.now() + (600000)
        await user.save({ validateBeforeSave: false })
        const link = `localhost:4200/resetpassword;token=${token}`
        const option = {
            email,
            subject: 'Your password reset link',
            html: resetPaswordTemplate(link)
        }
        sendmail(option)
        return `password reset link send on your registered email`
    }
    public async resetPassword(token: string, password: string, confirmPassword: string) {
        const user: IUser | null = await this.userModel.findOne({ passwordForgotToken: token, passwordTokenExprie: { $gt: Date.now() } })

        if (!user) throw new CustomeError(StatusConstants.NOT_FOUND.httpStatusCode, 'token expired');
        if (user && !user.isVerified) throw new CustomeError(StatusConstants.FORBIDDEN.httpStatusCode, 'please verify the email')
        user.password = password;
        user.confirmPassword = confirmPassword;
        (user as any).passwordTokenExprie = undefined;
        (user as any).passwordForgotToken = undefined;
        await user.save({ validateBeforeSave: true })
        const newToken = Jwt.sign({ email: user.email }, process.env.SECRET_KEY!, { expiresIn: 900000 })
        return newToken;
    }
    public async verifyUser(token: string) {
        const emailVerifaction = await EmailVerification.findOne({ token });
        if (!emailVerifaction) throw new CustomeError(StatusConstants.NOT_FOUND.httpStatusCode, 'please signup again');
        const user: IUser | null = await this.userModel.findOne({ email: emailVerifaction.email });
        if (!user) throw new CustomeError(StatusConstants.NOT_FOUND.httpStatusCode, 'user not found please signup again')
        user.isVerified = true;
        await user.save({ validateBeforeSave: false })
        await EmailVerification.deleteOne({ token })
        return Jwt.sign({ email: user.email }, process.env.SECRET_KEY!, { expiresIn: 900000 })
    }
}
export default UserService