// Import necessary modules
const businessPostModel = require("../models/businessPostModel");
const userModel = require("../models/userModel");
const bcrypt= require('bcrypt');
const { AuthUser } = require("../utils/helper");

// Define businessPostController methods
const businessPostController = {
    // Method to create a new businessPost
    create: async (req, res) => {
        const { user_name,email,password,category_id,sub_category_id,business_name,description,image,address,located_in,phone,website } = req.body;
        try {
            // check 
            const exisiting=await userModel.findOne({email});
    
            if(exisiting){
                return res.status(500).send({
                    success:false,
                    message:'Email already Registerd'
                })
            }
            //hashing the password
            const hashPassword = await bcrypt.hash(password, 10);

            const userInfo = await userModel.create({ userName:user_name,email,password:hashPassword,usertype:'business-owner' });
   
            const businessPostInfo = await businessPostModel.create({ user_id:userInfo._id,category_id,sub_category_id,business_name,description,image,address,located_in,phone,website });
            res.status(201).send({
                success: true,
                message: "Business Post Created Successfully",
                businessPostInfo
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: 'Error in creating business post',
                error: error.message
            });
        }
    },

    // Method to list all subcategories
    list: async (req, res) => {
        try {
            const businessPosts = await businessPostModel.find().populate([{
                'path':"category_id",
                'model':'Category'
            },
            {
                'path':"sub_category_id",
                'model':'SubCategory'
            },
            {
                'path':"user_id",
                'model':'User'
            }
            ],
        
            );
            res.status(200).send({
                success: true,
                message: "Business Posts Retrieved Successfully",
                businessPosts
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: 'Error in fetching categories',
                error: error.message
            });
        }
    }
};

// Export businessPostController
module.exports = businessPostController;
