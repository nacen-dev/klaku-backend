import nodemailer, { SendMailOptions } from "nodemailer";
import config from "config";
import { log } from "./logger";

const smtp = config.get<{
  user: string;
  pass: string;
  host: string;
  port: string;
  secure: string;
}>("smtp");

const transporter = nodemailer.createTransport({
  host: smtp.host,
  port: Number(smtp.port),
  secure: smtp.secure == "true",
  auth: { user: smtp.user, pass: smtp.pass },
});

export async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      log.error(err, "Error sending email");
    }
  });
}
