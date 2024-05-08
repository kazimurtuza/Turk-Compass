const express= require('express')
const { packageController } = require('../controllers/packageController')
const router=express.Router()
// package 
router.get('/get',packageController)
module.exports=router