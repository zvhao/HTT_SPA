const app = require("./src/app");
const env = require("./config/env");
const { logger } = require("./src/utils");



const PORT = env.PORT;

const server = app.listen(PORT, () =>
  logger.info(`server on http://localhost:${PORT}`)
);

process.on("SIGINT", () => {
  server.close(() => logger.info("Exits server."));
});