const { User } = require("../model/user");
const bcrypt = require("bcrypt");
const { response } = require("../response");

exports.adminLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (user.verified) {
        const password = await bcrypt.compare(req.body.password, user.password);
        if (password) {
          const user = await User.findOne({ email: req.body.email }).select(
            "-password"
          );
          return response(res, 200, "LoggedIn Successfully", user);
        } else {
          return response(res, 401, "Incorrect password");
        }
      } else {
        return response(res, 401, "User not Verified");
      }
    } else {
      return response(res, 404, "User not found");
    }
  } catch (err) {
    return response(res, 500, err);
  }
};
