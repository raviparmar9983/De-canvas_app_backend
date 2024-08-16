"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendmail = (option) => {
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'emely.ferry88@ethereal.email',
            pass: '9s3cp5x7FWzmDajmaR'
        }
    });
    transporter.sendMail({
        from: 'parmarravi2162@gmail.com',
        to: option.email,
        subject: option.subject,
        text: option.message
    });
};
exports.default = sendmail;
