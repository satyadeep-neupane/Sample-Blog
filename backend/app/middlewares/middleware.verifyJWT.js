require('dotenv').config({
    // path: './backend/.env'
});

const jwt = require('jsonwebtoken');
const User = require('../models/model.user');

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if(authHeader){
        const token = authHeader.split(' ')[1]; //Bearer token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            if(err)
                return res.status(401).send({
                    success: false,
                    error: err.message || "Invalid token"
                });

            try{
                user = await User.findById(user.sub);
                req.user = user;
                next();
            }catch(err){
                return res.status(401).send({
                    success: false,
                    error: err.message || "Invalid token"
                });
            }
        });
    }else{
        return res.status(401).send({
            success: false,
            error: 'Authorization token is missing'
        });
    }
}

module.exports = verifyJWT;
