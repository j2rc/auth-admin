
import nodemailer from 'nodemailer';

export async function sendMail(code, email) {
  try {
    // create reusable transporter object using the default SMTP transport
    const  transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'j2romay@gmail.com',
        pass: 'Zular-123',
        clientId: process.env.CLIENT_ID_GMAIL,
        clientSecret: process.env.CLIENT_SECRET_GMAIL,
        refreshToken: process.env.REFRESH_TOKEN_GMAIL
      }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"noreply@" <j2romay@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Code ✔", // Subject line
      text: `Code Verification: ${code}`, // plain text body
      html: `<b>Code Verification: ${code}</b>`, // html body
    });
  
    console.log(`Message sent: ${info.messageId} code: ${code}`);
    return info      
  } 
  catch (error) {
    console.error(error)   
    return null
  }
}