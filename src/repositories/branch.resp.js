"use trict";

const { default: mongoose } = require("mongoose");
const BranchModel = require("../models/Branch.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.findBranchByCode = async (code) => {
  return await BranchModel.findOne({ code }).lean();
};
exports.findAllBranch = async (filters) => {
//   if (typeof filters !== 'string') {
//     throw new Error('Invalid filters. Expected a string.');
// }
//   return await BranchModel.find({
//     $or: [
//         { name: { $regex: filters, $options: 'i' } },
//         { code: { $regex: filters, $options: 'i' } },
//         { address: { $regex: filters, $options: 'i' } }
//     ]
// }).lean();
return await BranchModel.find().lean()
};

exports.findBranchById = async (id) => {
  return await BranchModel.findById(new mongoose.Types.ObjectId(id)).lean();
};

exports.saveBranch = async ({
  name,
  code,
  address,
  desc,
  capacity,
  manager,
  owners,
  startTime,
  endTime,
}) => {
  return await BranchModel({
    name,
    code,
    address,
    desc,
    capacity,
    manager,
    owners,
    startTime,
    endTime,
  }).save();
};

exports.findOneAndUpdateBranch = async (id, data) => {
  return await BranchModel.findOneAndUpdate(
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
    message: "Login successful",
    user: data.username,
    token: token,
  };
};
