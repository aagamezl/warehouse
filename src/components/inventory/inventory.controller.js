const fs = require('fs').promises

const { StatusCodes } = require('http-status-codes')

const { logger } = require('./../../utils')
const { InventoryModel } = require('./inventory.model')

const getAll = async (req, res) => {
  try {
    const users = await InventoryModel.find()

    res.json(users)
  } catch (error) {
    logger.error(error)

    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const load = async (req, res) => {
  try {
    const fileContent = await fs.readFile(req.files.inventory.filepath, 'utf-8')

    const inventory = await InventoryModel.insertMany(JSON.parse(fileContent).inventory)

    res.status(StatusCodes.CREATED).json(inventory)
  } catch (error) {
    logger.error(error)

    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  getAll,
  load
}
