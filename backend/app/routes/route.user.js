const router = require('express').Router();
const userController = require("../controllers/controller.user");

const userSchema = require('../validators/validator.user');
const validate = require('../middlewares/middleware.validator');

router.route('/')
    .get(userController.getUser)
    .post(validate(userSchema), userController.createUser);

router.route('/:id')
    .get(userController.getUserById)
    .delete(userController.deleteUser);

module.exports = router;