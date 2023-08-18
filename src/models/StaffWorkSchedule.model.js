"use strict";

//-!dmbg
const mongoose = require("mongoose");

const DOCUMENT_NAME = "EmployeeWorkSchedule";
const COLLECTION_NAME = "EmployeeWorkSchedules";

var EmployeeWorkScheduleSchema = new mongoose.Schema(
  {
    start_date: {
      type: Date,
      required: true
    },
    timesheet: {
      day: {
        type: String,
        required: true,
      },
      start_time: {
        type: String,
        required: true,
      },
      end_time: {
        type: String,
        required: true,
      },
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, EmployeeWorkScheduleSchema);
