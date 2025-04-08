// app.js
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./db.js"; // Your Sequelize setup file
import catRoutes from "./routes/catRoutes.js";
import errorRoutes from "./router/errorRoutes.js";
import { pageNotFoundError, internalServerError } from "./controllers/errorController.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// For ES6 modules, define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Use API routes under "/api"
app.use("/api", catRoutes);

// Basic route to check if server is running
app.get("/", (req, res) => {
  res.send("Welcome to the Cat Blog!");
});

// Error handling routes
app.use(errorRoutes);
app.use(pageNotFoundError);
app.use(internalServerError);

// Synchronize database and start the server
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing the database:", error);
  });

  app.get("/", (req, res) => {
    res.render("index");
  });
  
  app.get("/about", (req, res) => {
    res.render("about");
  });
  
  app.get("/photos", (req, res) => {
    res.render("photos"); // Optional: Pass in task data here
  });
  
  app.get("/dev", (req, res) => {
    res.render("dev");
  });