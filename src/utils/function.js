export const customError = (error) => {
  return {
    flag: 0,
    errorMessage: error?.message || "Something Went Wrong!",
    statuCode: error?.statusCode || 500,
  };
};

export const sendResponse = (res, message, statusCode = 400, data = []) => {
  return res.status(statusCode).json({
    flag: 1,
    message: message,
    data: data,
  });
};

export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}