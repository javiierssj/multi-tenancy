require('dotenv').config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  db: {
    uri: process.env.DATABASE_URI,
    mongoDB: {
      type: process.env.MONGODB_TYPE,
      user: process.env.MONGODB_USER,
      passowrd: process.env.MONGODB_PASSWORD,
      host: process.env.MONGODB_HOST,
    },
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = config;