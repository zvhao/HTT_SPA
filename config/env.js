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
});

module.exports = env;
