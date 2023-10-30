"use trict";

const mongoose = require("mongoose");
const MongooseDelete = require("mongoose-delete");

const DOCUMENT_NAME = "StaffDayOff";
const COLLECTION_NAME = "StaffDayOff";

var StaffDayOffSchema = new mongoose.Schema(
  {
    branch: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    staff: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    dayOff: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false,
  }
);

StaffDayOffSchema.plugin(MongooseDelete, { deletedAt: true });

module.exports = mongoose.model(DOCUMENT_NAME, StaffDayOffSchema);
