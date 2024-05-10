const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Route to create a category
router.post('/create', categoryController.create);

// Route to list all categories
router.get('/list', categoryController.list);

module.exports = router;
