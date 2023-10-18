require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const express = require("express");
const env = require("../../config/env");

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "HTTSPA",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "HTTSPA/"); // Thay đổi đường dẫn đến thư mục lưu trữ ảnh
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
