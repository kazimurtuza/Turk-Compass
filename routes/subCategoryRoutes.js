const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryController');

// Route to create a subcategory
router.post('/create', subCategoryController.create);

// Route to list all subcategories
router.get('/list', subCategoryController.list);

module.exports = router;
