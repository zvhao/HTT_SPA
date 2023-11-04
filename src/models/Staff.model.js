"use trict";

const mongoose = require("mongoose");
const { hashPassword } = require("../utils/hash.util");
const MongooseDelete = require("mongoose-delete");

const DOCUMENT_NAME = "Staff";
const COLLECTION_NAME = "Staffs";

var StaffSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
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
    numPaidLeave: {
      type: Number,
      required: true,
    },
    basicSalary: {
      type: Number,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    consultingCommission: {
      type: Number,
      required: true,
    },
    serviceCommission: {
      type: Number,
      required: true,
    },
    allowances: {
      type: [mongoose.Schema.Types.Mixed],
      required: true,
    },
    workTime: {
      type: [mongoose.Schema.Types.Mixed],
      required: true,
    },
    role: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    branch: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false,
  }
);

StaffSchema.plugin(MongooseDelete, { deletedAt: true });

StaffSchema.pre("save", async function (next) {
  this.password = await hashPassword(this.password);
  next();
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, StaffSchema);
