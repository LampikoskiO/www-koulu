import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const User = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {  
    timestamps: true, // adds creaedAt and updatedAtt
    getterMethods: {
        fullName() {
            return `${this.firstName} ${this.lastName}`;
        }
    }
  }
);

export default User;
