"use trict";

const { default: mongoose } = require("mongoose");
const StaffModel = require("../models/Staff.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.findStaffByUsername = async (username) => {
  return await StaffModel.findOne({ username }).lean();
};
exports.findAllStaff = async (filters) => {
  return await StaffModel.find(filters).lean();
};

exports.findStaffById = async (id) => {
  return await StaffModel.findById(new mongoose.Types.ObjectId(id)).lean();
};

exports.saveStaff = async ({
  fullname,
  username,
  phone,
  email,
  address,
  numPaidLeave,
  basicSalary,
  position,
  password,
  consultingCommission,
  serviceCommission,
  allowances,
  workTime,
  role,
  branch,
}) => {
  return await StaffModel({
    fullname,
    username,
    phone,
    email,
    address,
    numPaidLeave,
    basicSalary,
    position,
    password,
    consultingCommission,
    serviceCommission,
    allowances,
    workTime,
    role,
    branch,
  }).save();
};

exports.findOneAndUpdateStaff = async (id, data, workTime) => {
  return await StaffModel.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(id),
    },
    {
      $set: {
        fullname: data.fullname,
        username: data.username,
        phone: data.phone,
        email: data.email,
        address: data.address,
        numPaidLeave: data.numPaidLeave,
        address: data.address,
        basicSalary: data.basicSalary,
        position: data.position,
        password: data.password,
        consultingCommission: data.consultingCommission,
        serviceCommission: data.serviceCommission,
        allowances: data.allowances,
        role: data.role,
        branch: data.branch,
      },
      $push: { workTime: workTime },
    },
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

exports.handleLogin = async (data, token, accInfo) => {
  return await {
    message: "Login successful",
    user: data.username,
    token: token,
    accInfo: accInfo
  };
};
