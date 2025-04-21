import express from "express";
import { pageNotFoundError, internalServerError } from "../controllers/errorController.js";

const router = express.Router();

router.use(pageNotFoundError);
router.use(internalServerError);

export default router;
