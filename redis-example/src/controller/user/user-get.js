import { User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";
import { redis } from "../../server";

export const getAllUser = async (req, res) => {
  let results;
  try {
    const user = await User.find({})
      .select("name email role")
      .populate("books", { name: 1, author: 1, journal: 1 });
    const cachedResult = await redis.get("user");
    if (cachedResult) {
      results = JSON.parse(cachedResult);
      return responseHandler(res, 200, "Data sent from cache", true, results);
    } else {
      results = redis.setex("user", 60, JSON.stringify(user));
      return responseHandler(res, 200, "Data sent from database", true, user);
    }
  } catch (err) {
    return responseHandler(res, 500, err.message);
  }
};
