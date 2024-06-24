import nodemailer from 'nodemailer';

const sendmail=(option:any)=>{
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'janessa72@ethereal.email',
            pass: 'xYq733k2nPXWQScb9T'
        }
    });
    transporter.sendMail({
        from: 'janessa72@ethereal.email',
        to: option.email,
        subject: option.subject,
        text: option.message
    })
}


export default sendmail