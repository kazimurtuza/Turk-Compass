const jobModel = require("../models/jobModel");
const { AuthUser } = require("../utils/helper");

const jobController={

    create:async(req,res)=>{

        const {description,skill,requirement,benifit,question}=req.body;

        const user_info= await AuthUser(req);
        const user_id=user_info.id;
        const jobInfo= await jobModel.create({user_id,description,skill,requirement,benifit,question});
    
        try{
        res.status(201).send({
            success:true,
            message:"Login Successfully",
            jobInfo
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
           success:false,
           message:'error in jobController api',
           error:error
        })
    }
    }



}

module.exports={jobController}