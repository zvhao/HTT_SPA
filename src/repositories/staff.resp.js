"use trict";

const { default: mongoose } = require("mongoose");
const StaffModel = require("../models/Staff.model")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

exports.findStaffByUsername = async (username) => {
  return await StaffModel.findOne({ username }).lean()
}
exports.findAllStaff = async () => {
  return await StaffModel.find().lean();
};

exports.findStaffById = async (id) => {
  return await StaffModel.findById(new mongoose.Types.ObjectId(id)).lean();
};

exports.saveStaff = async ({ fullname, username, phone, email, address, numPaidLeave, basicSalary, position, password, consultingCommission, serviceCommission, allowances, workTime, roles, branches }) => {
  return await StaffModel({ fullname, username, phone, email, address, numPaidLeave, basicSalary, position, password, consultingCommission, serviceCommission, allowances, workTime, roles, branches }).save()
}

exports.findOneAndUpdateStaff = async (id, data) => {
  return await StaffModel.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(id),
    },
    { $set: data },
    { new: true }
  ).lean();
};

exports.comparePasswords = (password, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.handleLogin = async (data, token) => {
  return await {
    message: 'Login successful',
    user: data.username,
    token: token
  };

}