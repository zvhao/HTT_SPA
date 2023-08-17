"use strict";

//-!dmbg
const mongoose = require("mongoose");

const DOCUMENT_NAME = "Role";
const COLLECTION_NAME = "Roles";

var RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    permissions: {
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
module.exports = mongoose.model(DOCUMENT_NAME, RoleSchema);
