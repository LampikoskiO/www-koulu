import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Photo = sequelize.define("Photo", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: { 
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Photo;