const express = require('express')

const { upload } = require('../../utils/middleware')
const { validate } = require('../../utils/middleware')

const controller = require('./product.controller')
const validations = require('./product.validations')

const router = express.Router({
  strict: true
})

router.post('/', [upload, validate(validations.upload)], controller.load)

router.get('/', controller.getAll)

router.post('/sale', validate(validations.sale), controller.sale)

module.exports = router
