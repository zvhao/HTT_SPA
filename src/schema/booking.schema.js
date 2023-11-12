"use strict";

const { object, string, number, array, date, unknown,  } = require("zod");

const BookingSchemaInput = object({
  body: object({
    services: array(string()), // Update with the correct validation for mongoose.Types.ObjectId
    status: number(),
    branch: string(), // Update with the correct validation for mongoose.Types.ObjectId
    date: string(),
    startTime: string(),
    endTime: string(),
    technician: string().nullable(),
    note: string(),
    customerInfo: array(unknown()), // Update with the correct validation for mongoose.Schema.Types.Mixed
    account: string().nullable(),
    customersNumber: number(),
  }),
});
module.exports = {
  BookingSchemaInput,
};
