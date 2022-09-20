import nodemailer from "nodemailer";

import { MAILER, APP_NAME } from "./../config";
import CustomError from "../utils/custom-error";

import type { IUser } from "./../models/user.model";

class MailService {
    user: IUser;

    constructor(user: IUser) {
        this.user = user;
    }

    async send(subject: string, content: string, recipient: string) {
        content = content || " ";

        if (!recipient || recipient.length < 1) throw new CustomError("Recipient is required");
        if (!subject) throw new CustomError("Subject is required");

        // Define nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: MAILER.HOST,
            port: MAILER.PORT,
            secure: MAILER.SECURE,
            auth: {
                user: MAILER.USER,
                pass: MAILER.PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        } as any);

        const result = await transporter.sendMail({
            from: `${APP_NAME} <noreply${MAILER.DOMAIN}>`,
            to: Array.isArray(recipient) ? recipient.join() : recipient,
            subject,
            text: content
        });

        if (!result) throw new CustomError("Unable to send mail");

        return result;
    }

    async sendEmailVerificationMail(link: string) {
        const subject = "Email Verification";
        const content = `Hey ${this.user.name}, Please click on the link to verify your email ${link}`;
        const recipient = this.user.email;

        return await this.send(subject, content, recipient);
    }

    async sendPasswordResetMail(link: string) {
        const subject = "Reset password";
        const content = `Hey ${this.user.name}, Please click on the link to reset your password ${link}`;
        const recipient = this.user.email;

        return await this.send(subject, content, recipient);
    }
}

export default MailService;
