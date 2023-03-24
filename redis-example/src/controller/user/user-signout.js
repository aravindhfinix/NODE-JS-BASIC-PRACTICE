import { User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";

export const userSignOut = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { logged_in: false },
      { new: true }
    );
    return responseHandler(res, 200, "User signedOut Successfully", true);
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
