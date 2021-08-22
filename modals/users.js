import Sequelize from "sequelize";
import { sequelize } from "../db/dbConnect.js";

const Users = sequelize.define(
  "users",
  {
    userid: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    enabled: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    courseid: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    avatar: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    updatedAt: "updateDate",
    createdAt: "registerDate",
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "userid" }],
      },
    ],
  }
);
export default Users;
