const { cleanEnv, str, num } = require("envalid");

const env = cleanEnv(process.env, {
  /**
   * ==================================
   * Database
   * ==================================
   */
  MONGO_URI: str({ default: "mongodb://127.0.0.1:27017/httspa" }),
  // MONGO_URI: str({ default: "mongodb://103.173.226.168:27017/httspa" }),

  /**
   * ==================================
   * Application
   * ==================================
   */
  PORT: num({ default: 8888 }),

  /**
   * ==================================
   * Client
   * ==================================
   */
  ORIGIN: str({ default: "http://localhost:3000" }),

  /**
   * ==================================
   * Log
   * ==================================
   */
  FOLDER_ROOT_LOG: str({ default: "logs" }),

  /**
   * ==================================
   * Cloudinary
   * ==================================
   */
  CLOUDINARY_CLOUD_NAME: str({ default: "dilwu8gqe" }),
  CLOUDINARY_API_KEY: str({ default: "248645875513972" }),
  CLOUDINARY_API_SECRET: str({ default: "jB_KNM3f_W_-rKdXWc0vFynt6QU" }),
});

module.exports = env;
