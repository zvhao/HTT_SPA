"use trict";

const {
  findOwnerByUsername,
  saveOwner,
  findAllOwner,
  findOwnerById,
  findOneAndUpdateOwner,
  comparePasswords,
  handleLogin,
} = require("../repositories/owner.resp");
const {
  ConflictRequestError,
  NotFoundRequestError,
} = require("../utils/error.util");
const roleService = require("./role.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const ownerService = {
  add: async ({
    fullname,
    username,
    phone,
    email,
    shop_name,
    password,
    roles,
  }) => {
    if (await findOwnerByUsername(username)) {
      throw new ConflictRequestError("Username exists");
    }
    const response = await saveOwner({
      fullname,
      username,
      phone,
      email,
      shop_name,
      password,
      roles,
    });
    const { password: pwd, ...owner } = response;

    return owner;
  },

  getAll: async (filters = {}) => {
    const owners = await findAllOwner();

    return await Promise.all(
      owners.map(
        (u) =>
          new Promise(async (resolve, reject) => {
            try {
              resolve(await ownerService.getById(u._id));
            } catch (error) {
              reject(error);
            }
          })
      )
    );
  },

  getById: async (id) => {
    let owner = await findOwnerById(id);
    const role = await roleService.getById(owner.role);
    return { ...owner, role };
  },

  update: async (id, data) => {
    if (data.username) {
      let user = await findOwnerByUsername(username);

      if (user && id !== user._id.toString()) {
        throw new ConflictRequestError("Username exists");
      }
    }

    return await findOneAndUpdateOwner(id, data);
  },

  login: async (data) => {
    let user = await findOwnerByUsername(data.username);

    if (!user) {
      throw new NotFoundRequestError("Username does not exist");
    }

    const passwordMatch = await comparePasswords(data.password, user.password);

    if (!passwordMatch) {
      throw new NotFoundRequestError("Incorrect password");
    }

    const token = jwt.sign({ _id: user._id }, "httspa", { expiresIn: "10d" });
    console.log(token);

    return {
      user: data.username,
      token: token,
    };
  },
};

module.exports = ownerService;
