"use strict";

const { object, string, number, array, date, unknown } = require("zod");

const CustomerSchemaInput = object({
  body: object({
    code: string().nonempty(),
    fullname: string().nonempty(),
    phone: string().nonempty(),
    password: string(),
    email: string(),
    address: string().nonempty(),
    gender: string().nonempty(),
    // birthday: date(),
    customerLevel: number().default(1),
    score: number().default(0),
  }),
});

module.exports = {
  CustomerSchemaInput,
};
