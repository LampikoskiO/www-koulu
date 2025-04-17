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

export const renderLoginPage = (req, res) => {
    res.render("users/login", { title: "Login" });
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || user.password !== password) {
            return res.status(401).render("users/login", { title: "Login", 
              error: "Invalid email or password" });
        }

        req.session.user = { id: user.id, name: user.name, email: user.email };
        res.redirect("/");
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).render("users/login", { title: "Login", 
          error: "An error occurred. Please try again." });
    }
};

export const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).send("Internal Server Error");
        }
        res.redirect("/users/login");
    });
};