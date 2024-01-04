const app = require("./app");
const config = require("./config");
const logger = require('./utils/logger'); 
const { connectDB } = require('./utils/db'); 

const PORT = config.port;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    logger.error('Database connection failed. Server not started', error);
    process.exit(1);
  });
