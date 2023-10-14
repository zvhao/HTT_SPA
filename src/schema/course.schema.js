"use strict";

const { object, string, number, array, date, unknown } = require("zod");

const CourseSchemaInput = object({
  body: object({
    code: string().nonempty(),
    name: string().nonempty(),
    imgs: array(unknown()),
    duration: number().refine((value) => value > 0, "Số phải là số dương"),
    technicianCommission: number().refine((value) => value >= 0),
    consultingCommission: number().refine((value) => value >= 0),
    desc: string(),
    package_details: array(unknown()),
    imgs: array(unknown()),
  }),
});

module.exports = {
  CourseSchemaInput,
};
