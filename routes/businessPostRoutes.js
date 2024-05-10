const express = require('express');
const router = express.Router();
const businessPostController = require('../controllers/businessPostController');

// Route to create a businessPost
router.post('/create', businessPostController.create);

// Route to list all subcategories
router.get('/list', businessPostController.list);

module.exports = router;
