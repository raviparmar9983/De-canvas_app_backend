"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendmail = (option) => {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: 'parmarravi1162@gmail.com',
            pass: 'yriy bpwl ykuf fgqz'
        }
    });
    transporter.sendMail({
        from: 'parmarravi1162@gmail.com',
        to: option.email,
        subject: option.subject,
        html: option.html
    });
};
exports.default = sendmail;
