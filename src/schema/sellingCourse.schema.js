"use strict";

const { object, string, number, array, date, unknown } = require("zod");

const SellingCourseSchemaInput = object({
  body: object({
    course: string({ message: "Mã khóa học không được để trống." }),
    status: number({
      message: "Trạng thái phải là một số.",
    }).refine((data) => [0, 1, 2, 3, 4].includes(data), {
      message: "Trạng thái không hợp lệ.",
    }),
    branch: string({ message: "Mã chi nhánh không được để trống." }),
    technician: string().optional(),
    note: string().optional(),
    customerInfo: object({
      name: string().min(1, { message: "Tên không được để trống." }),
      gender: string().min(1, { message: "Giới tính không được để trống." }),
      phone: string().min(1, { message: "Số điện thoại không được để trống." }),
      address: string().min(1, { message: "Địa chỉ không được để trống." }),
    }),
    account: string().optional(),
    package_detail: object({
      times: number().int({ message: "Số lần phải là một số nguyên." }),
      price: number({ message: "Giá phải là một số." }),
    }),
    detailsOfTurns: array(object()).refine((data) => data.length > 0, {
      message: "Chi tiết lịch không được để trống.",
    }),
  }),
});
module.exports = {
  SellingCourseSchemaInput,
};
