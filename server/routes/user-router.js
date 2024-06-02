const router = require("express")?.Router();

const { getAllUsers } = require("../controllers/user-controller");
const { signUpUser, signInUser } = require("../controllers/auth-controller");

router.route("/signup").post(signUpUser);
router.route("/signin").post(signInUser);

router.route("/").get(getAllUsers);

module.exports = router;
