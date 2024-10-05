import nodemailer from 'nodemailer';

const sendmail=(option:any)=>{
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'parmarravi1162@gmail.com',
            pass:'yriy bpwl ykuf fgqz'
        }
    });
    transporter.sendMail({
        from: 'parmarravi1162@gmail.com',
        to: option.email,
        subject: option.subject,
        html:option.html
    })
}


export default sendmail