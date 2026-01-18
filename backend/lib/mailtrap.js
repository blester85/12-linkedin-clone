import Nodemailer from 'nodemailer';
import { MailtrapTransport } from 'mailtrap';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;

export const mailtrapClient = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
    sandbox: true,
    testInboxId: 4257088
  })
);

export const sender = {
  address: process.env.EMAIL_FROM,
  name: process.env.EMAIL_FROM_NAME
};

// const recipients = ['wblester85@gmail.com'];

// mailtrapClient
//   .sendMail({
//     from: sender,
//     to: recipients,
//     subject: 'You are awesome!',
//     text: 'Congrats for sending test email with Mailtrap!',
//     category: 'Integration Test'
//   })
//   .then(console.log, console.error);
