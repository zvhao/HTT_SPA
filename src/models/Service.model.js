"use strict";

//-!dmbg
const mongoose = require("mongoose");
const MongooseDelete = require("mongoose-delete");


const DOCUMENT_NAME = "Service";
const COLLECTION_NAME = "Services";

var ServiceSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: BigInt,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    service_types: {
      type: [mongoose.Types.ObjectId],
      //   required: true,
    },
    combos: {
      type: [mongoose.Types.ObjectId],
      //   required: true,
    },
    courses: {
      type: [mongoose.Types.ObjectId],
      //   required: true,
    },
    consultingCommission: {
      type: Number,
      required: true,
    },
    technicianCommission: {
      type: Number,
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
    versionKey: false,
  }
);

ServiceSchema.plugin(MongooseDelete, { deletedAt: true })

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, ServiceSchema);
