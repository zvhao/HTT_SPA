"use strict";

//-!dmbg
const mongoose = require("mongoose");
const MongooseDelete = require("mongoose-delete");

const DOCUMENT_NAME = "Branch";
const COLLECTION_NAME = "Branches";

var BranchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    manager: {
      type: mongoose.Types.ObjectId,
      // required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    staffs: {
      type: [mongoose.Types.ObjectId],
    },
    courses: {
      type: [mongoose.Types.ObjectId],
    },
    combos: {
      type: [mongoose.Types.ObjectId],
    },
    services: {
      type: [mongoose.Types.ObjectId],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false,
  }
);

BranchSchema.plugin(MongooseDelete, { deletedAt: true });

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, BranchSchema);
