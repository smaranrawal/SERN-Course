module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.log('Error Midlleware',err.message)
  res
    .status(statusCode)
    .json({ sucess: false, message: err.message || "Internal Server Erroe" });
};
