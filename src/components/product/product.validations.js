const Joi = require('joi')

const config = require('./../../../config')

const { Segments } = require('./../../utils')

const validation = {
  // POST /inventory/upload
  upload: {
    [Segments.FILES]: Joi.object({
      products: Joi.object({
        filepath: Joi.string().required(),
        mimetype: Joi.string().case('lower').valid('application/json').required(),
        size: Joi.number().max(config.upload.maxSize).required()
      }).unknown(true)
    })
  },
  sale: {
    [Segments.BODY]: Joi.object({
      productId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      quantity: Joi.number().required()
    }).unknown(false)
  }
}

module.exports = validation
