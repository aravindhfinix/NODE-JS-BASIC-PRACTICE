exports.response = (res, statusCode, message, data) => {
  res.status(statusCode).json({ message: message, data: data });
};
