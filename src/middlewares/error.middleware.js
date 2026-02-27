import { customError } from "../utils/function.js";

export const errorHandler = (err, req, res, next) => {
  const errorFormat = customError(err);
  return res.status(errorFormat.statuCode).json(errorFormat);
};
