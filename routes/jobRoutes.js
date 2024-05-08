const express= require('express')
const { jobController } = require('../controllers/jobController')
const router=express.Router()
// job Create 
router.get('/create',jobController)
module.exports=router