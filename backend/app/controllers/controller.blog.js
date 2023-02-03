const Blog = require('../models/model.blog');
const uploader = require('../helpers/helper.fileUpload');

exports.getBlog = async (req, res) => {
    try{
        const blogs = await Blog.find();
        res.status(200).json({
            success: true,
            data: blogs
        });
    }catch(err)
    {
        res.status(400).json({
            success: false,
            message: err.message
        });
    } 
}

exports.getBlogById = async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: blog
        });
    }catch(err)
    {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

exports.createBlog = async (req, res) => {
    try{
        if(req.files)
        {
            const image = req.files.image;
            const imagePath = await uploader(image, 'blog');
            req.body.image = imagePath;
        }

        const blog = await Blog.create(req.body);
        res.status(200).json({
            success: true,
            data: blog
        });
    }catch(err)
    {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

exports.deleteBlog = async (req, res) => {
    try{
        const blog = await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            data: blog
        });
    }catch(err)
    {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}