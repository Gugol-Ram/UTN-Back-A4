const errorHandler = (error, req, res, next) => {
  console.log(error);
  res
    .status(error.status || 500)
    .json({ error: error.message || "Error en el servidor" });
};

module.exports = errorHandler;
