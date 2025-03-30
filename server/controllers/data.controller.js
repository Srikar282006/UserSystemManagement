const express = require("express");
const mongoose = require("mongoose");
const DataModel = require("../models/data.model.js");
const multer = require("multer");

// Multer Configuration for File Uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads"); // Ensure this folder exists
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + "-" + file.originalname;
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });

// Add New Data
const addData = async (req, res) => {
    const { FirstName, LastName } = req.body;

    try {
        if (!FirstName || !LastName) {
            return res.status(400).json({ message: "Fill details" });
        }

        let createdBy = req.user && mongoose.Types.ObjectId.isValid(req.user.id) ? req.user.id : null;

        const newData = await DataModel.create({
            FirstName,
            LastName,
            coverImage: req.file ? req.file.filename : null, 
            createdBy: createdBy,
        });

        return res.status(201).json({ message: "Data added successfully", newData });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



const editData = async (req, res) => {
    try {
        let data = await DataModel.findById(req.params.id).populate('createdBy'); // ✅ Ensure email is populated

        if (!data) {
            return res.status(404).json({ message: "User not found" });
        }

        let coverImage = req.file ? req.file.filename : data.coverImage;

        // Update DataModel fields
        data.FirstName = req.body.FirstName || data.FirstName;
        data.LastName = req.body.LastName || data.LastName;
        data.coverImage = coverImage;

        // Update email inside createdBy (UserModel)
        if (data.createdBy) {
            data.createdBy.email = req.body.email || data.createdBy.email;
            await data.createdBy.save(); // ✅ Ensure email is saved
        }

        await data.save();

        res.json({
            message: "User updated successfully",
            updatedData: {
                FirstName: data.FirstName,
                LastName: data.LastName,
                email: data.createdBy ? data.createdBy.email : "", // ✅ Include email in response
                coverImage: data.coverImage,
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Delete Data
const deleteData = async (req, res) => {
    try {
        await DataModel.deleteOne({ _id: req.params.id });
        res.json({ status: "ok", message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get All Users
const getAllData = async (req, res) => {
    try {
        const usersData = await DataModel.find({});
        console.log(" Users Found in Database:", usersData); // Debug log
        
        if (!usersData || usersData.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.json(usersData);
    } catch (error) {
        console.error("Error Fetching Users:", error);
        return res.status(500).json({ message: error.message });
    }
};


// Get Single User by ID
const getData = async (req, res) => {
    try {
        const userData = await DataModel.findById(req.params.id);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(userData);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { addData, upload, getAllData, getData, editData, deleteData };
