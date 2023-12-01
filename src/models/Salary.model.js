"use trict";

const mongoose = require("mongoose");
const MongooseDelete = require("mongoose-delete");
const DOCUMENT_NAME = "Salary";
const COLLECTION_NAME = "Salaries";

var SalarySchema = new mongoose.Schema(
  {
    staff: { type: mongoose.Types.ObjectId, required: true },
    branch: { type: mongoose.Types.ObjectId, required: true },
    basicSalary: { type: Number, required: true },
    allowance: { type: Number, required: true },
    commission: { type: Number, required: true },
    dayOff: { type: Number, required: true },
    bonus: { type: Number, required: true },
    fine: { type: Number, required: true },
    salary: { type: Number, required: true },
    paid: { type: Boolean, required: true },
    month: { type: Date, required: true },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false,
  }
);
SalarySchema.plugin(MongooseDelete, { deletedAt: true });
module.exports = mongoose.model(DOCUMENT_NAME, SalarySchema);
