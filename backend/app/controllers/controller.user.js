const User = require('../models/model.user');

exports.getUser = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({
            success: true,
            data: users
        });
    }catch(err)
    {
        res.status(400).json({
            success: false,
            message: err.message
        });
    } 
}

exports.getUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: user
        });
    }catch(err)
    {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

exports.createUser = async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.status(200).json({
            success: true,
            data: user
        });
    }catch(err)
    {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

exports.deleteUser = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            data: user
        });
    }catch(err)
    {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}