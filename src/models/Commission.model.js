"use trict";

const mongoose = require("mongoose");
const MongooseDelete = require("mongoose-delete");
const DOCUMENT_NAME = "Commission";
const COLLECTION_NAME = "Commissions";

var CommissionSchema = new mongoose.Schema(
  {

    technician: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    commission: {
      type: Number,
      required: true,
    },
    executionTime: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    booking: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false,
  }
);

CommissionSchema.plugin(MongooseDelete, { deletedAt: true });
module.exports = mongoose.model(DOCUMENT_NAME, CommissionSchema);
