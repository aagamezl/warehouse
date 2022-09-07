const { Router } = require('express')

// const { router: authRouter } = require('./components/auth')
const { router: inventoryRouter } = require('./components/inventory')
const { router: productRouter } = require('./components/product')

const router = Router()

/**
 * GET /status
 */
router.get('/status', (req, res) => {
  res.json({ status: 'ok' })
})

// router.use('/', authRouter)
router.use('/inventory', inventoryRouter)
router.use('/products', productRouter)

module.exports = router
