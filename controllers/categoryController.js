// Import necessary modules
const categoryModel = require("../models/categoryModel");
const { AuthUser } = require("../utils/helper");

// Define categoryController methods
const categoryController = {
    // Method to create a new category
    create: async (req, res) => {
        const { name } = req.body;
        try {
            const categoryInfo = await categoryModel.create({ name });
            res.status(201).send({
                success: true,
                message: "Category Created Successfully",
                categoryInfo
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: 'Error in creating category',
                error: error.message
            });
        }
    },

    // Method to list all categories
    list: async (req, res) => {
        try {
            const categories = await categoryModel.find();
            res.status(200).send({
                success: true,
                message: "Categories Retrieved Successfully",
                categories
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: 'Error in fetching categories',
                error: error.message
            });
        }
    }
};

// Export categoryController
module.exports = categoryController;
