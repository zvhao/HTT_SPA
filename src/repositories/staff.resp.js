"use trict";

const { default: mongoose } = require("mongoose");
const StaffModel = require("../models/Staff.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { regexData } = require("../core/fuction.code");
const { hashPassword } = require("../utils/hash.util");
const RoleModel = require("../models/Role.model");

exports.findStaffByUsername = async (username) => {
  return await StaffModel.findOne({ username: regexData(username) }).lean();
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
  branch,
}) => {
  let role = "";
  if (position === "manager") {
    let roleData = await RoleModel.findOne({ name: "manager" });
    role = roleData._id;
  } else {
    let roleData = await RoleModel.findOne({ name: "staff" });
    role = roleData._id;
  }
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

exports.findOneAndUpdateStaff = async (id, data) => {
  const hashedPassword = await hashPassword(data.password);
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
        password: hashedPassword,
        consultingCommission: data.consultingCommission,
        serviceCommission: data.serviceCommission,
        allowances: data.allowances,
        role: data.role,
        branch: data.branch,
      },
      $push: { workTime: data.workTime[0] },
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
    accInfo: accInfo,
  };
};
