import { User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";


export const searchUser = async (req, res) => {
  try {
    const name = req.query.name;
    const user = await User.find({
      name: { $regex: `^${name}`, $options: "i" },
    })
      .select("name email role")
      .populate("books", { name: 1, author: 1, journal: 1 });
    if (user.length === 0) {
      return responseHandler(res, 400, "No users", false);
    }
    return responseHandler(
      res,
      200,
      "User details sent successfully",
      true,
      user
    );
  } catch (err) {
    return responseHandler(res, 500, err.message);
  }
};
