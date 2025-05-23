const { DataTypes } = require("sequelize");
const { db } = require("../database/index"); // Your sequelize instance

const User = db.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true, // Primary key field
    },
    instanceId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cardNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false, // Disable createdAt and updatedAt fields if you want
    tableName: "Users", // Specify the actual table name
  }
);

module.exports = { User };
