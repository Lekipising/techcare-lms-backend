import Sequelize from "sequelize";
import { sequelize } from "../db/dbConnect.js";

const Courses = sequelize.define(
  "courses",
  {
    courseid: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    instructorid: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "userid",
      },
    },
  },
  {
    sequelize,
    tableName: "courses",
    timestamps: true,
    updatedAt: "updateDate",
    createdAt: "addDate",
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "courseid" }],
      },
      {
        name: "instructorid",
        using: "BTREE",
        fields: [{ name: "instructorid" }],
      },
    ],
  }
);
export default Courses;
