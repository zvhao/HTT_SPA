"use trict";

const mongoose = require("mongoose");
const MongooseDelete = require("mongoose-delete");
const DOCUMENT_NAME = "Booking";
const COLLECTION_NAME = "Bookings";

var BookingSchema = new mongoose.Schema(
  {
    services: {
      type: [mongoose.Types.ObjectId],
      required: true,
    },
    status: {
      type: Number,
      required: true,
      enum: [0, 1, 2, 3, 4],
    },
    branch: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    technician: {
      type: String,
    },
    note: {
      type: String,
    },
    customerInfo: {
      type: [mongoose.Schema.Types.Mixed],
      required: true,
    },
    account: {
      type: String,
    },
    customersNumber: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false,
  }
);

BookingSchema.plugin(MongooseDelete, { deletedAt: true });
module.exports = mongoose.model(DOCUMENT_NAME, BookingSchema);
