"use strict";

//-!dmbg
const mongoose = require("mongoose");
const MongooseDelete = require("mongoose-delete");

const DOCUMENT_NAME = "Course";
const COLLECTION_NAME = "Courses";

var CourseSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    package_details: {
      type: [mongoose.Schema.Types.Mixed],  
      required: true,
    },
    imgs: {
      type: Array,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
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
      // required: true,
    },
    services: {
      type: [mongoose.Types.ObjectId],
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false,
  }
);

CourseSchema.plugin(MongooseDelete, { deletedAt: true });

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, CourseSchema);
