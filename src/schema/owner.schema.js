"use strict";

const { object, string } = require("zod");

const OwnerSchemaInput = object({
  body: object({
    fullname: string({
      required_error: "Họ tên là trường bắt buộc",
    }),
    username: string({
      required_error: "Tài khoản là trường bắt buộc",
    }),
    phone: string({
      required_error: "Số điện thoại là trường bắt buộc",
    }),
    email: string({
      required_error: "Email là trường bắt buộc",
    }),
    shop_name: string({
      required_error: "Tên Shop là trường bắt buộc",
    }),
    password: string({
      required_error: "Mật khẩu là trường bắt buộc",
    }),
    roles: string({
      required_error: "Vai trò là 1 array bắt buộc",
    })
      .array()
      .nonempty({
        message: "Vai trò là 1 array không rỗng.",
      }),
  }),
});

module.exports = {
  OwnerSchemaInput,
};
