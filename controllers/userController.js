"use strict";
import User from "../models/user.js";

export const getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.render("users", { users });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send("Internal Server Error");
    }
  };

export const getUserById = (req, res) => {
  const userId = req.params.id;
  res.send(`Here is the user with ID: ${userId}`);
};

export const createUser = async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      await User.create({ firstName, lastName, email, password }); 
      res.redirect("/users"); 
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Internal Server Error");
    }
  };

export const updateUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = await User.findByPk(req.params.id);
        if(!user) {
            return res.status(404).send("User not found");
        }
        console.log("User found:", user);
        await user.update({ firstName, lastName, email, password });
        res.redirect("/users");
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const editUser = async (req, res) => {
    const userId = req.params.id;
    try {
    const user = await User.findByPk(userId);
    if (user) {
    res.render("users/edit", { user });
    } else {
    res.status(404).send("User not found");
    }
    } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal Server Error");
    }
    };
    

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (user) {
        await user.destroy();
        res.redirect("/users");
    } else {
        res.status(404).send(`User not found with ID ${userId}.`);
    }
}   catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Internal Server Error");
    }
    };