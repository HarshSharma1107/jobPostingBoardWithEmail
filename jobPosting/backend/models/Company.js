const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Company Schema
const companySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false }, // To handle email verification
});

companySchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  // Hash the password before saving
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
companySchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
