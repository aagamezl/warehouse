const ObjectId = require('./generateObjectId')

const getRecords = (records) => {
  return records.map(record => {
    return { ...record, id: ObjectId() }
  })
}

module.exports = getRecords
