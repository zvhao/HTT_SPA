"use trict";

const mongoose = require("mongoose")
const { hashPassword } = require("../utils/hash.util")
const MongooseDelete = require("mongoose-delete");

const DOCUMENT_NAME = "Owner";
const COLLECTION_NAME = "Owners";

var OwnerSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    shop_name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    branches: {
      type: [mongoose.Types.ObjectId],
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false

  }
);

OwnerSchema.plugin(MongooseDelete, { deletedAt: true })

OwnerSchema.pre("save", async function (next) {
  this.password = await hashPassword(this.password);
  next();
});



//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, OwnerSchema);