const nodemailer = require("nodemailer");
const mjml2html = require("mjml");

const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth:{
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
    });

    // MJML template defined directly in the controller
    const mjmlTemplate = options.message;
    
    // Compile MJML to HTML
    const { html } = mjml2html(mjmlTemplate);

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        html: html, // Use the compiled HTML from MJML
    }

    await transporter.sendMail(mailOptions);
};

module.exports = sendMail;