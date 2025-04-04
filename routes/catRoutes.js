// routes/catRoutes.js
import express from "express";
import { createCatPost, getAllCatPosts } from "../controllers/catController.js";

const router = express.Router();

router.get("/cats", getAllCatPosts);
router.post("/cats", createCatPost);

export default router;
