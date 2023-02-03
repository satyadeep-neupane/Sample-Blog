const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)

module.exports = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(50).required(),
  author: Joi.objectId().required(),
});
