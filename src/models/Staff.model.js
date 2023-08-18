"use trict";

const mongoose = require("mongoose")
const { hashPassword } = require("../utils/hash.util")
const mongooseDelete = require('mongoose-delete');
const MongooseDelete = require("mongoose-delete");

const DOCUMENT_NAME = "Employee";
const COLLECTION_NAME = "Employees";

var EmployeeSchema = new mongoose.Schema(
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
    num_days_leave_in_month: {
      type: Number,
      required: true,
    },
    basic_salary: {
      type: BigInt,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    allowances: {
      name: {
        type: String,
        required: true,
      },
      allowance: {
        type: Number,
        required: true,
      },
    },
    work_schedules: {
      type: [mongoose.Types.ObjectId],
      required: true,
    },
    roles: {
      type: [mongoose.Types.ObjectId],
      required: true,
    },
    branches: {
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

EmployeeSchema.plugin(MongooseDelete, { deletedAt: true })

EmployeeSchema.pre("save", async function (next) {
  this.password = await hashPassword(this.password);
  next();
});



//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, EmployeeSchema);