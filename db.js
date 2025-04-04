// db.js
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Create a new Sequelize instance using MariaDB connection parameters from .env
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mariadb',
  logging: false,
});

// Test the connection
try {
  await sequelize.authenticate();
  console.log('Connection to MariaDB has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// Define a simple model for a Cat post
const Cat = sequelize.define('Cat', {
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
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

// Sync the model with the database
await sequelize.sync();

export { sequelize, Cat };
