const errorHandler = (error, req, res, next) => {
  const status = res.statusCode ? res.statusCode : 500;
  return res.status(statusCode).json({ message: error.message });
};

module.exports = {
  errorHandler,
};
