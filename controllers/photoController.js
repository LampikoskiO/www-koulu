import Photo from "../models/photo.js"; 

// Show all photos
export const getAllPhotos = async (req, res) => {
    try {
        const photos = await Photo.findAll();
        console.log("Photos fetched:", photos);
        res.render("photos", { title: "Photos", photos });
    } catch (error) {
        console.error("Error fetching photos:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Add a new photo
export const addPhoto = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        const userId = req.session.user.id; 
        await Photo.create({ title, imageUrl, userId });       
        res.redirect("/photos");
    } catch (error) {
        console.error("Error adding photo:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Delete a photo by its ID
export const deletePhoto = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).send("You must be logged in to delete a photo");
        }

        const { id } = req.params;
        const userId = req.session.user.id; 

        const photo = await Photo.findOne({ where: { id } });

        if (!photo) {
            return res.status(404).send("Photo not found");
        }

        if (photo.userId !== userId) {
            return res.status(403).send("You are not authorized to delete this photo");
        }

        await Photo.destroy({ where: { id } });
        res.redirect("/photos");
    } catch (error) {
        console.error("Error deleting photo:", error);
        res.status(500).send("Internal Server Error");
    }
};