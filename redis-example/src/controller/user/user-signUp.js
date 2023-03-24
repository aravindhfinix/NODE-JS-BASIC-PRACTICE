import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userSchema, User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";
import { mailer } from "../../mailer/mailer";

export const userSignUp = async (req, res) => {
  try {
    let otp = Math.floor(1000 + Math.random() * 9000);
    // console.log(otp);
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return responseHandler(res, 403, error.details[0].message, false);
    } else {
      const hash = await bcrypt.hash(value.password, 10);
      value.password = hash;
      const preUser = await User.findOne({ email: value.email });
      if (preUser) {
        return responseHandler(res, 400, "User already exists", false);
      } else {
        const user = new User({
          name: value.name,
          email: value.email,
          password: value.password,
          confirmPassword: value.confirmPassword,
          role: value.role,
          otp: otp,
        });
        let users = await user.save();
        // users.password = users.role = user.confirmPassword = users.otp = 0;
        const token = jwt.sign({ id: user._id, role: user.role }, "sanjay", {
          expiresIn: "1d",
        });
        mailer(value, otp);
        return responseHandler(
          res,
          200,
          "Mail sent successfully",
          true,
          token,
          {
            name: users.name,
            email: users.email,
            _id: users._id,
            verified: users.verified,
            role: users.role,
          }
        );
      }
    }
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
