import nodemailer from "nodemailer";

interface Mail {
  name: string;
  from: string;
  to: string;
  subject: string;
  text: string;
}

export function sendMail({ name, from, subject, text, to }: Mail) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST_SMTP,
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER_SMTP,
        pass: process.env.PASS_SMTP,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    transporter.sendMail(
      {
        to,
        subject,
        html: `
        <div>
          <p><Send From:> ${from} - ${name}</p>
          <div>${text}</div>
        </div>
        `,
      },
      (error, info) => {
        if (error) {
          reject({
            error: true,
            message: error.message,
          });
        } else {
          resolve(info);
        }
      }
    );
  });
}
