const controller = require('./inventory.controller')
const { InventorySchema, InventoryModel } = require('./inventory.model')
const router = require('./inventory.routes')

module.exports = {
  controller,
  InventoryModel,
  router,
  InventorySchema
}
