
const senderMail = require("@sendgrid/mail");

senderMail.setApiKey(process.env.Sendgrid_API_KEY);

const sendMailFun = async function (email, EmailContent, subject) {
  console.log("--------------------", email);
  var resp=false;
  const msg = {
    to: email, // replace these with your email addresses
    from: process.env.Sendgrid_MAIL_SENDER,
    subject: subject,
    html: EmailContent,
  };

  await senderMail.send(msg).then(() => {
    console.log('emails sent successfully!');
    resp= true
  }).catch(error => {
    console.log(error);
    resp= false
  });
  return resp
}

module.exports = {
  sendMailFun,
}