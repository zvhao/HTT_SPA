const jwt = require("jsonwebtoken");

exports.decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, "httspa");
    return decoded
  } catch (error) {
    // console.error("Lỗi giải mã token:", error);
    return error
  }
};

exports.regexData = (data) => {
  return new RegExp('^' + data + '$', 'i');
}