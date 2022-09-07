const formidable = require('formidable')

/**
 * Parse form data upload files
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
const upload = (req, res, next) => {
  const form = formidable({ multiples: true })

  form.parse(req, (error, fields, files) => {
    if (error) {
      next(error)

      return
    }

    req.fields = fields
    req.files = files

    next()
  })
}

module.exports = upload
