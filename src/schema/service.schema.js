"use strict";

const { object, string, number, array, date, unknown } = require("zod");

const ServiceSchemaInput = object({
  body: object({
    code: string().nonempty(),
    name: string().nonempty(),
    price: number().refine((value) => value > 0, "Số phải là số dương"),
    duration: number().refine((value) => value > 0, "Số phải là số dương"),
    // service_types: string(),
    // combos: string(),
    // courses: string(),
    technicianCommission: number().refine((value) => value >= 0),
    consultingCommission: number().refine((value) => value >= 0),
    desc: string(),
  }),
});

module.exports = {
    ServiceSchemaInput,
  };
  
