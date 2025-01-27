const Job = require('../models/Job');
const nodemailer = require('nodemailer');

// Post a new job
exports.postJob = async (req, res) => {
  const { title, description, experienceLevel, endDate, candidateEmails } = req.body;
  const companyId = req.userId; // Assume userId is added by auth middleware

  try {
    const newJob = new Job({
      title,
      description,
      experienceLevel,
      endDate,
      companyId
    });

    await newJob.save();

    // Send email notifications
    await sendJobAlerts(candidateEmails, newJob);

    res.status(201).json({ message: 'Job posted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Send job alerts to candidates
async function sendJobAlerts(candidates, job) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  for (let email of candidates) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `New Job Posted: ${job.title}`,
      text: `Job Title: ${job.title}\nDescription: ${job.description}\nExperience Level: ${job.experienceLevel}\nEnd Date: ${job.endDate}\n`
    };

    await transporter.sendMail(mailOptions);
  }
}
