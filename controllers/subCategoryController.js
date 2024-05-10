// Import necessary modules
const subCategoryModel = require("../models/subCategoryModel");
const { AuthUser } = require("../utils/helper");

// Define subcategoryController methods
const subCategoryController = {
    // Method to create a new subcategory
    create: async (req, res) => {
        const { category,name } = req.body;
        try {
            const subCategoryInfo = await subCategoryModel.create({ category,name });
            res.status(201).send({
                success: true,
                message: "Sub Category Created Successfully",
                subCategoryInfo
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

    // Method to list all subcategories
    list: async (req, res) => {
        try {
            const subCategories = await subCategoryModel.find().populate({
                'path':"category",
                'model':'Category'
            });
            res.status(200).send({
                success: true,
                message: "SubCategories Retrieved Successfully",
                subCategories
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

// Export subcategoryController
module.exports = subCategoryController;
