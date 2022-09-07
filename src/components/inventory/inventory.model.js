const mongoose = require('mongoose')

const { schemaSerializer } = require('./../../utils')

const { Schema } = mongoose

const InventorySchema = new Schema({
  art_id: String,
  name: String,
  stock: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

InventorySchema.set('toJSON', schemaSerializer)

const InventoryModel = mongoose.model('Inventory', InventorySchema)

module.exports = {
  InventoryModel,
  InventorySchema
}
