const fs = require('fs').promises

const { StatusCodes } = require('http-status-codes')

const { logger } = require('./../../utils')
const { InventoryModel } = require('./../inventory/inventory.model')
const { ProductModel } = require('./product.model')

const getAll = async (req, res) => {
  try {
    const users = await ProductModel.aggregate([
      {
        $addFields: {
          articleCount: {
            $size: '$contain_articles'
          }
        }
      },
      {
        $unwind: '$contain_articles'
      },
      {
        $group: {
          _id: '$contain_articles.art_id',
          productId: {
            $first: '$_id'
          },
          name: {
            $first: '$name'
          },
          articleCount: {
            $first: '$articleCount'
          },
          total: {
            $sum: '$contain_articles.amount_of'
          },
          count: {
            $sum: 1
          }
        }
      },
      {
        $lookup: {
          from: 'inventories',
          localField: '_id',
          foreignField: 'art_id',
          as: 'articles'
        }
      },
      {
        $unwind: '$articles'
      },
      {
        $project: {
          _id: 1,
          productId: 1,
          articleCount: 1,
          name: 1,
          productCount: {
            $floor: {
              $divide: [
                '$articles.stock',
                {
                  $divide: [
                    '$total',
                    '$count'
                  ]
                }
              ]
            }
          }
        }
      },
      {
        $group: {
          _id: '$productId',
          quantity: {
            $min: '$productCount'
          },
          name: {
            $first: '$name'
          }

        }
      },
      {
        $match: {
          quantity: {
            $gt: 0
          }
        }
      }
    ])

    res.json(users)
  } catch (error) {
    logger.error(error)

    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const load = async (req, res) => {
  try {
    const fileContent = await fs.readFile(req.files.products.filepath, 'utf-8')

    const products = await ProductModel.insertMany(JSON.parse(fileContent).products)

    res.status(StatusCodes.CREATED).json(products)
  } catch (error) {
    logger.error(error)

    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const sale = async (req, res) => {
  try {
    const { productId, quantity } = req.body

    const product = await ProductModel.findOne({
      id: productId
    })

    // product

    for (const article of product.contain_articles) {
      await InventoryModel.updateOne(
        { id: article.id },
        { $inc: { stock: (quantity * article.amount_of * -1) } }
      )
    }

    res.sendStatus(StatusCodes.NO_CONTENT)
  } catch (error) {
    logger.error(error)

    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  getAll,
  load,
  sale
}
