const mongoose = require('mongoose')

const { schemaSerializer } = require('./../../utils')

const { Schema } = mongoose

const ProductSchema = new Schema({
  name: String,
  price: Number,
  contain_articles: [{ art_id: String, amount_of: Number }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

ProductSchema.set('toJSON', schemaSerializer)

const ProductModel = mongoose.model('Product', ProductSchema)

module.exports = {
  ProductModel,
  ProductSchema
}
