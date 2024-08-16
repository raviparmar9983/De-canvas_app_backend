import nodemailer from 'nodemailer';

const sendmail=(option:any)=>{
    const transporter = nodemailer.createTransport({
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
    })
}


export default sendmail