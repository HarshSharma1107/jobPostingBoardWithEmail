const nodemailer = require('nodemailer');

exports.sendVerificationEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Please verify your email address',
    text: 'Click on the following link to verify your email address: [Verification Link]'
  };

  await transporter.sendMail(mailOptions);
};
