"use strict";

const { object, string, number, array, date, unknown } = require("zod");

const ComboSchemaInput = object({
  body: object({
    code: string().nonempty(),
    name: string().nonempty(),
    services: array(unknown()).default([]),
    price: number().refine((value) => value > 0, "Số phải là số dương"),
    duration: number().refine((value) => value > 0, "Số phải là số dương"),
    technicianCommission: number().refine((value) => value >= 0),
    consultingCommission: number().refine((value) => value >= 0),
    desc: string().default(""),
  }),
});

module.exports = {
  ComboSchemaInput,
};
