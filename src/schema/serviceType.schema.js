"use strict";

const { object, string, number, array, date, unknown } = require("zod");

const ServiceTypeSchemaInput = object({
  body: object({
    code: string().nonempty(),
    name: string().nonempty(),
    // services: array(),
    desc: string(),
  }),
});

module.exports = {
  ServiceTypeSchemaInput,
};
