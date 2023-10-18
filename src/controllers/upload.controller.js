"use strict";

const { CreatedResponse } = require("../utils/success.util");
const cloudinary = require("cloudinary").v2;

module.exports = {
  async upload(req, res) {
    const images = req.files;
    const imagePaths = [];
    for (const image of images) {
      const result = await cloudinary.uploader.upload(image.path);
      imagePaths.push(result.secure_url);
    }
    return new CreatedResponse({
      message: "upload success",
      metadata: imagePaths,
    }).send(res);
  },
};
