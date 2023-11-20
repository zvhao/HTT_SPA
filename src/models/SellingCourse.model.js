"use trict";

const mongoose = require("mongoose");
const MongooseDelete = require("mongoose-delete");
const DOCUMENT_NAME = "SellingCourse";
const COLLECTION_NAME = "SellingCourses";

var SellingCourseSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      //   enum: [0, 1, 2, 3, 4],
    },
    branch: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    note: {
      type: String,
    },
    customerInfo: {
      name: {
        type: String,
        // required: true,
      },
      gender: {
        type: String,
        // required: true,
      },
      phone: {
        type: String,
        // required: true,
      },
      address: {
        type: String,
        // required: true,
      },
    },
    account: {
      type: String,
    },
    package_detail: {
      times: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
    detailsOfTurns: {
      type: [mongoose.Schema.Types.Mixed],
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false,
  }
);

SellingCourseSchema.plugin(MongooseDelete, { deletedAt: true });
module.exports = mongoose.model(DOCUMENT_NAME, SellingCourseSchema);
