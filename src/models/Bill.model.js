"use trict";

const mongoose = require("mongoose");
const MongooseDelete = require("mongoose-delete");
const DOCUMENT_NAME = "Bill";
const COLLECTION_NAME = "Bills";

var BillSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    bookingInfomation: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    bookingTime: {
      type: Date,
      required: true,
    },
    branch: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    totalPayment: {
      type: Number,
      required: true,
    },
    counselorInfomation: {
      staff: {
        type: String,
      },
      percent: {
        type: Number,
      },
    },
    paymentInformation: {
      discount: {
        type: String,
      },
      value: {
        type: Number,
      },
    },
    paymentMethods: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false,
  }
);

BillSchema.plugin(MongooseDelete, { deletedAt: true });
module.exports = mongoose.model(DOCUMENT_NAME, BillSchema);
