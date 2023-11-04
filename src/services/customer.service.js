"use trict";
const {
  ConflictRequestError,
  NotFoundRequestError,
} = require("../utils/error.util");
const roleService = require("./role.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const { regexData } = require("../core/fuction.code");
const CustomerModel = require("../models/Customer.model");
const { hashPassword } = require("../utils/hash.util");

const customerService = {
  add: async ({
    code,
    fullname,
    phone,
    password,
    email,
    address,
    sex,
    birthday,
    customerLevel,
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
      sex,
      birthday,
      customerLevel,
      role,
    }).lean();
    return response;
  },

  getAll: async (dataAccount, filters = {}) => {
    // if (dataAccount !== null && dataAccount?.role === "staff") {
    //   const manager = await findStaffById(dataAccount.id);
    //   filters.branch = manager.branch;
    //   filters.position = { $ne: "manager" };
    // }
    const customers = await CustomerModel.find(filters);

    return await Promise.all(
      customers.map(
        (u) =>
          new Promise(async (resolve, reject) => {
            try {
              resolve(await this.getById(u._id));
            } catch (error) {
              reject(error);
            }
          })
      )
    );
  },

  getById: async (id) => {
    const customer = await CustomerModel.findById(id);
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

  // update: async (id, data) => {
  //   if (data.username) {
  //     // console.log(data.username);
  //     let user = await findStaffByUsername(data.username);
  //     // var workTime = user.workTime.pop();
  //     // console.log(user);

  //     if (user && id !== user._id.toString()) {
  //       throw new ConflictRequestError("Username exists");
  //     }
  //     // delete data.workTime;
  //     //   console.log(data);
  //     //   console.log(workTime);
  //   }

  //   return await findOneAndUpdateStaff(id, data);
  //   // return console.log(data);
  // },

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
