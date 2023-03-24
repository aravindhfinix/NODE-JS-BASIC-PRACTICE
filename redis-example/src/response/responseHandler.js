export const responseHandler = (
  res,
  statusCode,
  message,
  status,
  data,
  details
) => {
  return res
    .status(statusCode)
    .json({ message: message, status: status, data: data, details });
};
