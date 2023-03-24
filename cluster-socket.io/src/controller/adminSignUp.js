const { userSchema, User } = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { mailer } = require("../nodemailer/mailer");
const { response } = require("../response");

var otp = Math.floor(1000 + Math.random() * 9000);
console.log(otp);
exports.adminSignUp = async (req, res) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      console.log(error.details[0].message);
      return response(res, 403, error.details[0].message);
    } else {
      const hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;
      const preUser = await User.findOne({ email: value.email });
      if (preUser) {
        return response(res, 403, "User already exists");
      } else {
        const user = new User({
          email: value.email,
          password: req.body.password,
          otp: otp,
        });
        await user.save();
        console.log(value);
        const token = jwt.sign({ id: user._id }, "sanjay", {
          expiresIn: "1d",
        });
        mailer(value, otp);
        return response(res, 200, "Success", token);
      }
    }
  } catch (err) {
    return response(res, 500, err);
  }
};
