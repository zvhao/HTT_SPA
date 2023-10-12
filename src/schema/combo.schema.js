"use strict";

const { object, string, number, array, date, unknown } = require("zod");

const ComboSchemaInput = object({
  body: object({
    code: string().nonempty(),
    name: string().nonempty(),
    services: array(unknown()),
    desc: string(),
  }),
});

module.exports = {
  ComboSchemaInput,
};
