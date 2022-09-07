const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
// const swaggerUI = require('swagger-ui-express')

// const docs = require('./docs')
const routes = require('./api.routes')
const { logger } = require('./utils')

/**
 * Express instance
 * @public
 */
const app = express()

const main = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING)
  } catch (error) {
    logger.error(error)
  }

  app.use(helmet())

  // parse application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: false }))

  // parse application/json
  app.use(express.json())

  // mount api routes
  app.use('/', routes)

  // Swagger route
  // const options = {
  //   explorer: true,
  //   swaggerOptions: {
  //     url: '/api-docs/swagger.json'
  //   }
  // }
  // app.get('/api-docs/swagger.json', (req, res) => res.json(docs))
  // app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs, options))
}

main().catch(error => {
  logger.error(error)
})

module.exports = app
