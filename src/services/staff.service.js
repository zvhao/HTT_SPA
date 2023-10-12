"use trict";

const {
  findStaffByUsername,
  saveStaff,
  findAllStaff,
  findStaffById,
  findOneAndUpdateStaff,
  comparePasswords,
  handleLogin,
} = require("../repositories/staff.resp");
const {
  ConflictRequestError,
  NotFoundRequestError,
} = require("../utils/error.util");
const roleService = require("./role.service");
const branchService = require("./branch.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const staffService = {
  add: async ({
    fullname,
    username,
    phone,
    email,
    address,
    numPaidLeave,
    basicSalary,
    position,
    password,
    consultingCommission,
    serviceCommission,
    allowances,
    workTime,
    role,
    branch,
  }) => {
    if (await findStaffByUsername(username)) {
      throw new ConflictRequestError("Username exists");
    }
    const response = await saveStaff({
      fullname,
      username,
      phone,
      email,
      address,
      numPaidLeave,
      basicSalary,
      position,
      password,
      consultingCommission,
      serviceCommission,
      allowances,
      workTime,
      role,
      branch,
    });
    const { password: pwd, ...staff } = response;

    return staff;
  },

  getAll: async (dataAccount, filters = {}) => {
    if (dataAccount !== null && dataAccount.role === "staff") {
      const manager = await findStaffById(dataAccount.id);
      filters.branch = manager.branch;
      filters.position = { $ne: "manager" };
    }
    const staffs = await findAllStaff(filters);

    return await Promise.all(
      staffs.map(
        (u) =>
          new Promise(async (resolve, reject) => {
            try {
              resolve(await staffService.getById(u._id));
            } catch (error) {
              reject(error);
            }
          })
      )
    );
  },

  getById: async (id) => {
    const staff = await findStaffById(id);
    // console.log(staff);
    const role = await roleService.getById(staff.role);
    return { ...staff, role };
  },

  update: async (id, data) => {
    if (data.username) {
      // console.log(data.username);
      let user = await findStaffByUsername(data.username);
      var workTime = user.workTime.pop();
      // console.log(user);

      if (user && id !== user._id.toString()) {
        throw new ConflictRequestError("Username exists");
      }
      delete data.workTime;
      //   console.log(data);
      //   console.log(workTime);
    }

    return await findOneAndUpdateStaff(id, data, workTime);
  },

  login: async (data) => {
    let user = await findStaffByUsername(data.username);

    if (!user) {
      throw new NotFoundRequestError("Username does not exist");
    }

    const passwordMatch = await comparePasswords(data.password, user.password);

    if (!passwordMatch) {
      throw new NotFoundRequestError("Incorrect password");
    }

    const token = jwt.sign({ id: user._id, role: "staff" }, "httspa", {
      expiresIn: "10d",
    });
    // console.log(token);
    const role = await roleService.getById(user.role);
    const accInfo = { ...user, role };

    return handleLogin(data, token, accInfo);
  },
};

module.exports = staffService;