const userModel = require("../models/userModel");
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken')

const registerController =async(req,res)=>{
    try{
        const {userName,email,password,}=req.body;
        // validation
        if(!userName || !email || !password){
            return res.status(500).send({
                success:false,
                message:'please provide all fields'
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        // check 
        const exisiting=await userModel.findOne({email});

        if(exisiting){
            return res.status(500).send({
                success:false,
                message:'Email already Registerd please login'
            })
        }
        const srcky=process.env.BCRYP_KEY
        const user=await userModel.create({userName:userName,email:email,password:hashPassword})
        const id=user.id;
        const user_type=user.usertype;
        const package_type=user.package_type;
    

        let token = jwt.sign({userName,email,user_type,package_type,id},srcky,{ expiresIn: '1h' });
        const info={
            token:token,
            user_info:user,
        }
        res.status(201).send({
            success:true,
            message:"successfully Register User",
            data:info
            

        })
    }catch(error){
             console.log(error)
             res.status(500).send({
                success:false,
                message:'error in register api',
                error:error
             })
    }
}
const loginController=async(req,res)=>{
    try{
    const {email,password,}=req.body;
    const record = {email: email};
    // validation
    if(!email || !password){
        return res.status(500).send({
            success:false,
            message:'please provide all fields'
        })
    }
    // check 
    const user=await userModel.findOne({email:email});
    const userName=user.userName;

    let is_user = await bcrypt.compare(password, user.password);



    if(!user || !is_user){
        return res.status(404).send({
            success:false,
            message:'User not found Or password invalid'
        })
    }
    if(is_user){
        const id=user.id;
        const user_type=user.usertype;
        const package_type=user.package_type;
        const srcky=process.env.BCRYP_KEY
        let token = jwt.sign({userName,email,user_type,package_type,id},srcky,{ expiresIn: '1h' });
        const info={
            token:token,
            user_info:user,
        }
        res.status(201).send({
            success:true,
            message:"Login Successfully",
            info
        })
    }

 
}catch(error){
    console.log(error)
    res.status(500).send({
       success:false,
       message:'error in login api',
       error:error
    })
}

}
module.exports={registerController,loginController};