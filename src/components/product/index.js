const controller = require('./product.controller')
const { ProductSchema, ProductModel } = require('./product.model')
const router = require('./product.routes')

module.exports = {
  controller,
  ProductModel,
  router,
  ProductSchema
}
