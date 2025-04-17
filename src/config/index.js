require("dotenv").config();

const { PORT, HASH_SALT_ROUNDS } = process.env;
module.exports = { PORT, HASH_SALT_ROUNDS };
