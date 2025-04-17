import express from "express";
import { getAllUsers, getUserById, 
    createUser, updateUser, 
    editUser, deleteUser, 
    renderLoginPage,
    loginUser, logoutUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/new", (req, res) => {
    res.render("users/new");
});

router.get("/", getAllUsers);
router.get("/login", renderLoginPage);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id/update", updateUser);
router.get("/:id/edit", editUser);
router.delete("/:id/delete", deleteUser);



export default router;