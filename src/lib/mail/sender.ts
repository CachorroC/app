import 'server-only';
import nodemailer from 'nodemailer';

type SendMailInput = {
  to     : string;
  subject: string;
  text   : string;
  html   : string;
};

const globalForMail = global as unknown as { rsMailTransporter?: ReturnType<typeof nodemailer.createTransport> };

function getTransporter() {
  if ( !globalForMail.rsMailTransporter ) {
    globalForMail.rsMailTransporter = nodemailer.createTransport( {
      host  : process.env.SMTP_HOST,
      port  : Number( process.env.SMTP_PORT || 587 ),
      secure: Number( process.env.SMTP_PORT ) === 465,
      auth  : {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    } );
  }

  return globalForMail.rsMailTransporter;
}

export async function sendMail( {
  to, subject, text, html
}: SendMailInput ): Promise<void> {
  await getTransporter()
    .sendMail( {
      from: process.env.SMTP_FROM,
      to,
      subject,
      text,
      html,
    } );
}
