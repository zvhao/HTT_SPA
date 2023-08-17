"use strict";

const { object, string } = require("zod");

const PermissionCreateSchema = object({
  body: object({
    name: string({
      required_error: "Tên quyền là trường bắt buộc",
    }),
    desc: string({
      required_error: "Mô tả là trường bắt buộc",
    }),
    alias: string({
      required_error: "Slug là trường bắt buộc",
    }),
  }),
});

module.exports = {
  PermissionCreateSchema,
};
