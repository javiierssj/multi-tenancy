const mongoose = require('mongoose');
const config = require('../config');
const logger = require('./logger');

mongoose.connection.on('connected', () => {
  logger.info('MongoDB Connection Established');
});

mongoose.connection.on('reconnected', () => {
  logger.info('MongoDB Connection Reestablished');
});

mongoose.connection.on('disconnected', () => {
  logger.info('MongoDB Connection Disconnected');
});

mongoose.connection.on('close', () => {
  logger.info('MongoDB Connection Closed');
});

mongoose.connection.on('error', (error) => {
  logger.error('MongoDB ERROR: ' + error);
  process.exit(1);
});

const connectDB = async () => {
  try {
    await mongoose.connect(config.db.uri);
    logger.info('Connected to MongoDB!');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = { connectDB };
