const { User } = require("../model/user");
const { response } = require("../response");

const verify = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById({ _id: userId });
    const otp = req.body.otp;
    console.log(otp);
    if (user.otp === otp) {
      const user = await User.findByIdAndUpdate(
        {
          _id: userId,
        },
        { verified: true },
        { new: true }
      );
      return response(res, 200, "Account verified");
    } else {
      return response(res, 401, "Incorrect OTP");
    }
  } catch (err) {
    return response(res, 500, err);
  }
};

module.exports = verify;
