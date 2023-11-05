"use trict";

const mongoose = require("mongoose");
const MongooseDelete = require("mongoose-delete");

const DOCUMENT_NAME = "Customer";
const COLLECTION_NAME = "Customers";

var CustomerSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      //   required: true,
    },
    email: {
      type: String,
      //   required: true,
    },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["nam", "nữ", "khác"],
    },
    birthday: {
      type: Date,
    },
    customerLevel: {
      type: Number,
      default: 1,
    },
    score: {
      type: Number,
      default: 0,
    },
    role: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false,
    timezone: "Asia/Ho_Chi_Minh",
  }
);

CustomerSchema.plugin(MongooseDelete, { deteleAt: true });

module.exports = mongoose.model(DOCUMENT_NAME, CustomerSchema);
