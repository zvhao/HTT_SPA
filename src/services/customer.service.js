"use trict";
const {
  ConflictRequestError,
  NotFoundRequestError,
  BadRequestError,
} = require("../utils/error.util");
const roleService = require("./role.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const { regexData } = require("../core/fuction.code");
const CustomerModel = require("../models/Customer.model");
const { hashPassword } = require("../utils/hash.util");
const RoleModel = require("../models/Role.model");

const customerService = {
  add: async ({
    code,
    fullname,
    phone,
    password,
    email,
    address,
    gender,
    birthday,
    customerLevel,
    score,
  }) => {
    if (await CustomerModel.findOne({ phone: phone })) {
      throw new ConflictRequestError("phone exists");
    }
    let hashedPassword = "";
    if (password !== "") {
      hashedPassword = hashPassword(password);
      password = hashedPassword;
    }
    let roleData = await RoleModel.findOne({ name: "customer" });
    const role = roleData._id;

    const response = await CustomerModel({
      code,
      fullname,
      phone,
      password,
      email,
      address,
      gender,
      birthday,
      customerLevel,
      score,
      role,
    }).save();

    return response;
  },

  getAll: async (dataAccount, filters = {}) => {
    // if (dataAccount !== null && dataAccount?.role === "staff") {
    //   const manager = await findStaffById(dataAccount.id);
    //   filters.branch = manager.branch;
    //   filters.position = { $ne: "manager" };
    // }
    const customers = await CustomerModel.find(filters);
    // return customers
    return await Promise.all(
      customers.map(
        (u) =>
          new Promise(async (resolve, reject) => {
            try {
              resolve(await customerService.getById(u._id));
            } catch (error) {
              reject(error);
            }
          })
      )
    );
  },

  getById: async (id) => {
    const customer = await CustomerModel.findById(id).lean();
    // return customer
    // console.log(customer);
    const role = await roleService.getById(customer.role);
    return { ...customer, role };
  },

  // getByTokenId: async (id) => {
  //   const staff = await findStaffById(id);
  //   // console.log(staff);
  //   const role = await roleService.getById(staff.role);
  //   const branch = await BranchModel.findById(staff.branch);
  //   return { ...staff, role, branch };
  // },

  update: async (id, data) => {
    if (data.phone && data.code) {
      let customerByPhone = await CustomerModel.findOne({
        phone: data.phone,
      }).lean();
      if (customerByPhone && id !== customerByPhone._id.toString()) {
        throw new ConflictRequestError("phone exists");
      }
      let customerByCode = await CustomerModel.findOne({
        code: data.code,
      }).lean();
      if (customerByCode && id !== customerByCode._id.toString()) {
        throw new ConflictRequestError("phone exists");
      }
      let hashedPassword = "";
      if (data.password !== "") {
        hashedPassword = await hashPassword(data.password);
        data.password = hashedPassword;
      }
      return await CustomerModel.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      ).lean();
    } else if (
      Object.keys(data).length === 2 &&
      data?.customerLevel &&
      data?.score
    ) {
      return await CustomerModel.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      ).lean();
    } else {
      throw new BadRequestError("Lỗi");
    }
    // return console.log(data);
  },

  // login: async (data) => {
  //   let user = await findStaffByUsername(data.username);

  //   if (!user) {
  //     throw new NotFoundRequestError("Username does not exist");
  //   }

  //   const passwordMatch = await comparePasswords(data.password, user.password);
  //   // console.log(passwordMatch);

  //   if (!passwordMatch) {
  //     throw new NotFoundRequestError("Incorrect password");
  //   }

  //   const token = jwt.sign({ id: user._id, role: "staff" }, "httspa", {
  //     expiresIn: "60d",
  //   });
  //   const role = await roleService.getById(user.role);
  //   const accInfo = { ...user, role };

  //   return handleLogin(data, token, accInfo);
  //   // return console.log(passwordMatch);
  // },
};

module.exports = customerService;
