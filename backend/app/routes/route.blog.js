const router = require('express').Router();
const blogController = require("../controllers/controller.blog");

const blogSchema = require('../validators/validator.blog');
const validate = require('../middlewares/middleware.validator');

router.route('/')
    .get(blogController.getBlog)
    .post(validate(blogSchema), blogController.createBlog);

router.route('/:id')
    .get(blogController.getBlogById)
    .delete(blogController.deleteBlog);

module.exports = router;