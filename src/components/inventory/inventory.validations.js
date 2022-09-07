const Joi = require('joi')

const config = require('./../../../config')

const { Segments } = require('./../../utils')

const validation = {
  // POST /inventory/upload
  upload: {
    [Segments.FILES]: Joi.object({
      inventory: Joi.object({
        filepath: Joi.string().required(),
        mimetype: Joi.string().case('lower').valid('application/json').required(),
        size: Joi.number().max(config.upload.maxSize).required()
      }).unknown(true)
    })
  }
}

module.exports = validation
