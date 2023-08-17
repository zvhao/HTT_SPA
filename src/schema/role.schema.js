"use strict";

const { object, string } = require("zod");

const RoleSchemaInput = object({
  body: object({
    name: string({
      required_error: "Tên quyền là trường bắt buộc",
    }),
    desc: string({
      required_error: "Mô tả là trường bắt buộc",
    }),
    permissions: string({
      required_error: "Permissions là 1 array bắt buộc",
    })
      .array()
      .nonempty({
        message: "Permissions là 1 array không rỗng.",
      }),
  }),
});

module.exports = {
  RoleSchemaInput,
};
