function errorHandler(err, req, res, next) {
    let code = 500
    let message = 'Internal Server Error'

    if (err.name == 'notFound') {
        code = 404
        message = 'Not Found!'
    } else if (err.name == 'SequelizeValidationError') {
        code = 400
        message = err.errors[0].message
    }


    res.status(code).json({ message })
}

module.exports = errorHandler