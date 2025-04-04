// models/cat.js
import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Cat = sequelize.define(
  "Cat",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

export default Cat;
