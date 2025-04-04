// app.js
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./db.js";
import catRoutes from "./routes/catRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// For ES6 modules, compute __dirname:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Use cat routes under the "/api" prefix
app.use("/api", catRoutes);

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the Cat Blog using MariaDB!");
});

// Sync database and start the server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((error) => {
  console.error("Unable to sync database:", error);
});

export default app;
