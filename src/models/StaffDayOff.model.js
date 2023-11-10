"use trict";

const mongoose = require("mongoose");
const MongooseDelete = require("mongoose-delete");
const DOCUMENT_NAME = "StaffDayOff";
const COLLECTION_NAME = "StaffDayOff";

// const middleware = (schema) => {
//   // Đặt múi giờ mặc định là +7
//   schema.set("timezone", "Asia/Ho_Chi_Minh");
// };

// mongoose.plugin(middleware);

var StaffDayOffSchema = new mongoose.Schema(
  {
    branch: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    staff: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    dayOff: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false,
    timezone: "Asia/Ho_Chi_Minh",
  }
);
// StaffDayOffSchema.plugin(ttl, { ttl: 0, timezone: "+07:00" });
StaffDayOffSchema.plugin(MongooseDelete, { deletedAt: true });

module.exports = mongoose.model(DOCUMENT_NAME, StaffDayOffSchema);
