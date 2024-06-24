import mongoose from "mongoose";




const emailVerification=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    token:{
        type:String,
        required:true,
        unique:true
    }
})

const EmailVerification=mongoose.model('EmailVerification',emailVerification)
export default EmailVerification