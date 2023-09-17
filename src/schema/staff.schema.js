"use strict";

const { object, string, number, array, date, unknown } = require("zod");

const StaffSchemaInput = object({
  body: object({
    fullname: string().nonempty(),
    username: string().nonempty(),
    phone: string().nonempty(),
    email: string().nonempty(),
    address: string().nonempty(),
    numPaidLeave: number().refine(value => value > 0, 'Số phải là số dương'),
    basicSalary: number().refine(value => value > 0, 'Số phải là số dương'),
    position: string().nonempty(),
    password: string().nonempty(),
    consultingCommission: number().refine(value => value > 0, 'Số phải là số dương'),
    serviceCommission: number().refine(value => value > 0, 'Số phải là số dương'),
    allowances: array(unknown()),
    workTime: array(unknown()),
    role: string().nonempty(),
    branch: string().nonempty(),
  })
});

module.exports = {
  StaffSchemaInput,
};
