module.exports.logErrors = function logErrors(err, req, res, next) {
	console.error(err.stack)
	next(err)
}

module.exports.clientErrorHandler = function clientErrorHandler(err, req, res, next) {
	if (req.xhr) {
		res.status(500).send({ error: 'Something failed!' })
	} else {
		next(err)
	}
}

module.exports.errorHandler = function errorHandler(err, req, res, next) {
	res.status(500)
	res.json({ "error": "Something went wrong, check logs" })
}