const express = require('express')

const { upload } = require('../../utils/middleware')
const { validate } = require('../../utils/middleware')

const controller = require('./inventory.controller')
const validations = require('./inventory.validations')

const router = express.Router({
  strict: true
})

router.post('/', [upload, validate(validations.upload)], controller.load)

router.get('/', controller.getAll)

module.exports = router
