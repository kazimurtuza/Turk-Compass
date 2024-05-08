const packageController=(req,res)=>{
    try{
        res.status(200).send(
            [
                {
                    'title':"free",
                    'description':{job_seeker_access:0,ads:0,compass:0,monthly_price:0,verify_employers:0,review_job_applications:0,custom_questions:0},

                },
                {
                    'title':"premium",
                    'description':{job_seeker_access:0,ads:0,compass:0,monthly_price:4.99,verify_employers:4.99,review_job_applications:0,custom_questions:0,stripe_product:'price_1PDKejJ4eJxlN0V78W518dgE'},
                

                },
                {
                    'title':"employer",
                    'description':{job_seeker_access:0,ads:0,compass:0,monthly_price:0,verify_employers:0,review_job_applications:0,custom_questions:0},
            

                },
                {
                    'title':"premium_employer",
                    'description':{job_seeker_access:0,ads:0,compass:0,monthly_price:9.99,verify_employers:0,review_job_applications:0,custom_questions:10,stripe_product:'price_1PDKhlJ4eJxlN0V7k9uhBLL5'}
            

                }
          ]
        )
    }catch(error){
        console.error("Error in testUserController:", error);
        
    }
}
const productController=async(req,res)=>{
    try{

    res.status(201).send({
        success:true,
        message:"Login Successfully",
        user
    })
}catch(error){
    console.log(error)
    res.status(500).send({
       success:false,
       message:'error in productController api',
       error:error
    })
}

}

module.exports={packageController,productController}