import { MailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from "nodemailer";
import 'dotenv/config'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Alisson Felipe <alissonfelipenettt@gmail.com>",
      subject,
      html: body,
    });
  }
}
