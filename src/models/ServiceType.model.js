"use strict";

//-!dmbg
const mongoose = require("mongoose");
const MongooseDelete = require("mongoose-delete");

const DOCUMENT_NAME = "ServiceType";
const COLLECTION_NAME = "ServiceTypes";

var ServiceTypeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    //   required: true,
    },
    services: {
      type: [mongoose.Types.ObjectId],
    //   required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false,
  }
);

ServiceTypeSchema.plugin(MongooseDelete, { deletedAt: true });

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, ServiceTypeSchema);
