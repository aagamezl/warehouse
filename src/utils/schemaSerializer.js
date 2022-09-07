const schemaSerializer = {
  virtuals: false,
  versionKey: false/* ,
  transform: (doc, ret) => {
    delete ret._id
  } */
}

module.exports = schemaSerializer
