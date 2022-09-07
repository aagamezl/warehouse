const { ReasonPhrases, StatusCodes } = require('http-status-codes')

const Segments = require('./../validation')

const VALIDATE_OPTIONS = {
  abortEarly: false // include all errors
}

/**
 * Give format to the Joi error object
 *
 * @param {object} error
 * @param {string} source
 * @returns {object}
 */
const formatError = (error, source) => {
  const { details } = error
  const errors = details.map((item) => {
    return {
      key: item.context.key,
      message: item.message
    }
  })

  return {
    status: StatusCodes.BAD_REQUEST,
    title: ReasonPhrases.BAD_REQUEST,
    details: {
      source,
      errors
    }
  }
}

/**
 *
 * @param {object} schema Joi schema
 * @returns {Function} The validation middleware
 */
const validate = (schema) => {
  return async (req, res, next) => {
    if (schema[Segments.PARAMS] !== undefined) {
      const { error } = await schema[Segments.PARAMS]
        .validateAsync(req.params, VALIDATE_OPTIONS)
        .catch(error => {
          return { error }
        })

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST)
          .json(formatError(error, Segments.PARAMS))
      }
    }

    if (schema[Segments.QUERY] !== undefined) {
      const { error } = await schema[Segments.QUERY]
        .validateAsync(req.query, VALIDATE_OPTIONS)
        .catch(error => {
          return { error }
        })

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST)
          .json(formatError(error, Segments.QUERY))
      }
    }

    if (schema[Segments.BODY] !== undefined) {
      const { error } = await schema[Segments.BODY]
        .validateAsync(req.body, VALIDATE_OPTIONS)
        .catch(error => {
          return { error }
        })

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST)
          .json(formatError(error, Segments.BODY))
      }
    }

    if (schema[Segments.FILES] !== undefined) {
      const { error } = await schema[Segments.FILES]
        .validateAsync(req.files, VALIDATE_OPTIONS)
        .catch(error => {
          return { error }
        })

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST)
          .json(formatError(error, Segments.FILES))
      }
    }

    next()
  }
}

module.exports = validate
