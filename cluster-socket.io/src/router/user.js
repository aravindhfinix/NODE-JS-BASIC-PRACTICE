const router = require("express").Router();
const verifyToken = require("../middleware/user");
const userSignUp = require("../controller/userSignUp");
const userVerify = require("../controller/userVerify.js");
const { userLogin } = require("../controller/userLogin");
const { adminLogin } = require("../controller/adminLogin");
const { adminSignUp } = require("../controller/adminSignUp");
const { adminVerify } = require("../controller/adminVerify");


router.post("/user/signup", userSignUp);

router.get("/user/verify", verifyToken, userVerify);

router.post("/user/login", userLogin);

router.post("/admin/signup", adminSignUp);

router.post("/admin/login", adminLogin);

router.get("/admin/verify", verifyToken, adminVerify);

module.exports = router;
