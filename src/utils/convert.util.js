"use strict";

exports.toLowerCase = (str) => {
  return { $regex: new RegExp("^" + str.toLowerCase(), "i") };
};
