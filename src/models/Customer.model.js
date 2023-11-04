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
    sex: {
      type: Boolean,
      required: true,
    },
    birthday: {
      type: Date,
    },
    customerLevel: {
      type: mongoose.Types.ObjectId,
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
  }
);

CustomerSchema.plugin(MongooseDelete, { deteleAt: true });

module.exports = mongoose.model(DOCUMENT_NAME, CustomerSchema);
