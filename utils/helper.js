const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Assuming this function is within an Express route handler
async function AuthUser(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return false;
    }

    const [bearer, token] = authHeader.split(' ');

    // Check if the Authorization header is in the Bearer format
    if (bearer !== 'Bearer' || !token) {
        // Handle case where Authorization header is not in the Bearer format
        return false;
    }

    // At this point, 'token' contains the bearer token

    let info=await jwt.decode(token);

    return info;
}


module.exports = { AuthUser };