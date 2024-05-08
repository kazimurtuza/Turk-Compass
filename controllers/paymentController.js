const moment = require('moment');
const { AuthUser } = require('../utils/helper');
const jwt=require('jsonwebtoken');
const userModel = require('../models/userModel');

const stripe = require('stripe')(process.env.STRIPE_KEY);

const stripePaymentController=async(req,res)=>{
    try{
        const { price_key } = req.query;
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [{
                price:price_key, // Replace 'price_123' with the actual Price ID
                quantity: 1,
            }],
            success_url: "http://localhost:8080/success",
            cancel_url: "http://localhost:8080/cancel"
        });
        


        res.status(200).send(
            {
                success:true,
                message:"stripe payment",
                data:session,
                price:price_key,
            }
        )
    }catch(error){
        console.error("Error in testUserController:", error);
   

    }
}

const stripePaymentSuccess=async(req,res)=>{
    const { sessionId } = req.body;
    var user_data

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
  
      if (session.payment_status === 'paid') {
          const subscriptionId = session.subscription;
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const userInfo=await AuthUser(req);
          if(!userInfo){

            res.status(401).send(
                {
                    success:false,
                    message:"Unauthorize user",
                }
            )
          }
    
          try {
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            // const user = await admin.auth().getUser(firebaseId);
            const planId = subscription.plan.id;
            const planType = "free"
            const amount=subscription.plan.amount;

            // Package
            if(amount==499) planType="premium";
            if(amount==999) planType="premium_employer";
            // Package

            user_data= await userModel.updateOne({ _id: userInfo.id }, { $set: {package_type:planType,package_start_date:startDate,package_end_date:endDate,package_duration:durationInDays} })
            
            const startDate = moment.unix(subscription.current_period_start).format('YYYY-MM-DD');
            const endDate = moment.unix(subscription.current_period_end).format('YYYY-MM-DD');
            const durationInSeconds = subscription.current_period_end - subscription.current_period_start;
            const durationInDays = moment.duration(durationInSeconds, 'seconds').asDays();

            res.status(200).send(
                {
                    success:true,
                    message:"stripe payment",
                    // data:subscription,
                    user:user_data,    
                }
            )
            } catch (error) {
              console.error('Error retrieving subscription:', error);
            }
        
            res.status(200).send(
                {
                    success:true,
                    message:"stripe payment",
                    data:subscription,
                    user:user_data,  
             
                }
            )
        } else {
          return res.json({ message: "Payment failed" });
        }
      } catch (error) {
        res.send(error);
      }

}

module.exports={stripePaymentController,stripePaymentSuccess}