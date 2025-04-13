// app.js
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./db.js"; // Sequelize config
import catRoutes from "./routes/catRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// For ES6 modules: define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api", catRoutes);

// Page routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/photos", (req, res) => {
  res.render("photos");
});

app.get("/dev", (req, res) => {
  res.render("dev");
});

// Start server after DB sync
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("DB sync error:", error);
  });