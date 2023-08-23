"use strict";

const { object, string, number, date } = require("zod");

const BranchSchemaInput = object({
  body: object({
    name: string({
      required_error: "Tên chi nhánh là trường bắt buộc",
    }),
    code: string({
      required_error: "Mã chi nhánh là trường bắt buộc",
    }),
    address: string({
      required_error: "Địa chỉ là trường bắt buộc",
    }),
    capacity: number({
      required_error: "Sức chứa là 1 trường bắt buộc",
    }),
    manager: string({
      required_error: "Nhân viên quản lý là trường bắt buộc",
    }),
    startTime: string({
      required_error: "Thời gian bắt đầu là 1 trường bắt buộc",
    }),
    endTime: string({
      required_error: "Thời gian kết thúc là 1 trường bắt buộc",

    }),
  }),
});

module.exports = {
  BranchSchemaInput,
};
