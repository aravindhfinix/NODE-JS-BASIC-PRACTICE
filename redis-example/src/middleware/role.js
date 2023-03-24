import jwt from "jsonwebtoken";
import { responseHandler } from "../response/responseHandler";

export const role = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const data = await jwt.verify(token, "sanjay");
    if (data) {
      req.userId = data.id;
      req.role = data.role;
      // console.log(req.role);
      next();
    }
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
