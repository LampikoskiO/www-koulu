import express from "express";
import { renderHomePage, renderAboutPage } from "../controllers/homeController.js";

const router = express.Router();

router.get("/", renderHomePage); 
router.get("/about", renderAboutPage); 

export default router;