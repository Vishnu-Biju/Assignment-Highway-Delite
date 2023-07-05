import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});
export const sendMail = async (details, sendTo, subject) => {
    let mailOptions = {
        from: process.env.MAIL_USER,
        to: sendTo,
        subject: subject,
        text: details,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(`${error}`, { module: `Node Mailer` });
        }
        else {
            console.log(`Email sent: ${info.response}`, { module: `Node Mailer` });
        }
    });
};
//# sourceMappingURL=mailer.js.map