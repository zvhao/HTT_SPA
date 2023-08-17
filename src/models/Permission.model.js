"use strict";

//-!dmbg
const mongoose = require("mongoose");

const DOCUMENT_NAME = "Permission";
const COLLECTION_NAME = "Permissions";

var PermissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
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
module.exports = mongoose.model(DOCUMENT_NAME, PermissionSchema);
