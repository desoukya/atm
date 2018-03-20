require('dotenv').config();

const POSTGRES_URI = process.env.POSTGRES_URI_LOCAL;

module.exports = {

  development: {
    client: 'pg',
    connection: POSTGRES_URI
  }
};
