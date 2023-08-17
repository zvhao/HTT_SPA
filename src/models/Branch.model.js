"use strict";

//-!dmbg
const mongoose = require("mongoose");

const DOCUMENT_NAME = "Branch";
const COLLECTION_NAME = "Branches";

var BranchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    employees: {
      type: [mongoose.Types.ObjectId],
      required: true,
    },
    courses: {
      type: [mongoose.Types.ObjectId],
      required: true,
    },
    combos: {
      type: [mongoose.Types.ObjectId],
      required: true,
    },
    services: {
      type: [mongoose.Types.ObjectId],
      required: true,
    },

  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, BranchSchema);
