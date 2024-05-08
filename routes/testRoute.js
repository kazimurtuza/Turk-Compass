const express=require('express');
const { testUserController } = require('../controllers/testController');

const route=express.Router();
// route    GET|POST|UPDATE|DELETE
route.get('/test-user',testUserController)

// export
module.exports=route