const jwt = require("jsonwebtoken");
const { User } = require("../model/user");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const data = await jwt.verify(token, "sanjay");
    if (data) {
      const user = await User.findById({ _id: data.id });
      console.log(user);
      if (user.verified) {
        console.log(user.verified);
        return res.json({ msg: "User has been already Verified" });
      } else {
        req.userId = user.id;
        next();
      }
    } else {
      return res.json({ msg: "Access Denied" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = verifyToken;
