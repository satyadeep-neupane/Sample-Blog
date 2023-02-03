const router = require('express').Router();

const authController = require('../controllers/controller.auth');

const loginSchema = require('../validators/validator.login');
const validate = require('../middlewares/middleware.validator');

router.post('/login', validate(loginSchema), authController.attemptLogin);
router.post('/refresh-token', authController.getNewAccessToken);


module.exports = router;