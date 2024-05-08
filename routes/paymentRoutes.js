const express=require('express');
const { stripePaymentController, stripePaymentSuccess } = require('../controllers/paymentController');

const route=express.Router();
// route    GET|POST|UPDATE|DELETE
route.get('/payment',stripePaymentController)
route.get('/payment-success',stripePaymentSuccess)
route.post('/payment-success',stripePaymentSuccess)

// export
module.exports=route