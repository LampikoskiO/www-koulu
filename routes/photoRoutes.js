import express from "express";
import { getAllPhotos, addPhoto, deletePhoto } from "../controllers/photoController.js";

const router = express.Router();

router.get("/photos", getAllPhotos); // Show all photos
router.post("/photos", addPhoto); // Add a new photo
router.delete("/photos/:id", deletePhoto); // Delete a photo by it's ID

export default router;