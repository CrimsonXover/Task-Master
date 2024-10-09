import { forgotPasswordTemplate, registerEmailTemplate, verificationCodeTemplate } from '../utils/constants.mjs'
import './dotenv.mjs'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

export const sendEmail = async (recipientEmail, emailSubject, code) => {
    if (!recipientEmail || !emailSubject || !code) {
        console.error('Missing required parameters')
    }

    try {
        const templates = {
            'Welcome to Task-Master': registerEmailTemplate,
            'Verify Your Email Address': verificationCodeTemplate,
            'Reset Password': forgotPasswordTemplate,
        }

        const templateFunction = templates[emailSubject]
        if (!templateFunction) {
            console.warn('No template found for the given subject')
            return
        }

        const htmlBody = templateFunction(code)

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: recipientEmail,
            subject: emailSubject,
            html: htmlBody,
        }

        await transporter.sendMail(mailOptions)
        return { success: true }
    } catch (error) {
        console.error('Error sending email:', error)
        return { success: false, error: error.message }
    }
}