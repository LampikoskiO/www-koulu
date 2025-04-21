// app.js
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./db.js"; // Sequelize config
import catRoutes from "./routes/catRoutes.js";
import errorRoutes from "./routes/errorRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import photoRoutes from "./routes/photoRoutes.js";
import methodOverride from "method-override";
import session from 'express-session';
import { pageNotFoundError, internalServerError } from "./controllers/errorController.js";

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
app.use(express.urlencoded({ extended: true }));

// Middleware for sessions
app.use(session({
  secret: "kissathakeelintuja",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // In dev mode set to false, in production must set to true
}));

// For PUT and DELETE requests
app.use(methodOverride('_method'));

// Make user visible in views
app.use((req, res, next) => {
  console.log("Session user: ", req.session.user);
  res.locals.user = req.session.user || null; 
  next();
});

// API routes
app.use("/api", catRoutes);

app.use("/users", userRoutes);
app.use("/", homeRoutes);
app.use("/", photoRoutes);

// Error handling routes
app.use(errorRoutes);
app.use(pageNotFoundError);
app.use(internalServerError);

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
sequelize.sync({ alter: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("DB sync error:", error);
  });