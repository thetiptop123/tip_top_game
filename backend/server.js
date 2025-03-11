const dotenv = require('dotenv');
dotenv.config();

const branch = process.env.BRANCH || 'prod'; // Default to production

const dbConfig = {
  dev: {
    user: process.env.DB_USER_DEV,
    password: process.env.DB_PASS_DEV,
    database: process.env.DB_NAME_DEV,
  },
  preprod: {
    user: process.env.DB_USER_PREPROD,
    password: process.env.DB_PASS_PREPROD,
    database: process.env.DB_NAME_PREPROD,
  },
  prod: {
    user: process.env.DB_USER_PROD,
    password: process.env.DB_PASS_PROD,
    database: process.env.DB_NAME_PROD,
  },
};

const selectedDB = dbConfig[branch];
console.log(`Connecting to ${branch} database:`, selectedDB);
