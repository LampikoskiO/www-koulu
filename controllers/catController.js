// controllers/catController.js
import Cat from "../models/cat.js";

export const createCatPost = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const newCat = await Cat.create({ title, content, imageUrl });
    res.status(201).json(newCat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCatPosts = async (req, res) => {
  try {
    const cats = await Cat.findAll();
    res.status(200).json(cats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
