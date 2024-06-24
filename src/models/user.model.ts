import mongoose, { Schema, Document } from "mongoose";
import IUser from "../interfaces/user.interface";
import bcrypt from 'bcrypt'
import crypto from 'crypto'

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: 8,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'confirm password is required'],
        minlength: 8,
        validate: {
            validator: function (val: string): Boolean {
                return (this as any).password == val;
            },
            message: 'password and confirm password must be same'
        },
        select: false
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    passwordForgotToken:String,
    passwordTokenExprie:Date
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
        return;
    }
    this.password = await bcrypt.hash(this.password, 12);
    (this.confirmPassword as any) = undefined;
    next()
})

userSchema.methods.comparePassword=async function (password:string) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.otpGenerat=async function () {
    const token=crypto.randomBytes(32).toString('hex')
    const otpToken= crypto.createHash('sha256').update(token).digest('hex')
    return otpToken
}


const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;