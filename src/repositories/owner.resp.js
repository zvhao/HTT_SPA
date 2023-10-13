"use trict";

const { default: mongoose } = require("mongoose");
const OwnerModel = require("../models/Owner.model")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const { regexData } = require("../core/fuction.code");

exports.findOwnerByUsername = async (username) => {
  return await OwnerModel.findOne({ username: regexData(username) }).lean()
}
exports.findAllOwner = async () => {
  return await OwnerModel.find().lean();
};

exports.findOwnerById = async (id) => {
  return await OwnerModel.findById(new mongoose.Types.ObjectId(id)).lean();
};

exports.saveOwner = async ({ fullname, username, phone, email, shop_name, password, roles }) => {
  return await OwnerModel({ fullname, username, phone, email, shop_name, password, roles }).save()
}

exports.findOneAndUpdateOwner = async (id, data) => {
  return await OwnerModel.findOneAndUpdate(
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
    user: data.username,
    token: token
  };

}