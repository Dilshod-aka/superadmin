const {Router} = require("express");

const {loginC} = require("../controllers/auth.controller");
const {addUser, getUsers} = require("../controllers/user.controller");
const checkRole = require("../middlewares/check-role.middleware");
const isAuth = require("../middlewares/is-auth.middleware");

const router = Router();
 
router.post("/auth/login", loginC);
router.post("/user", isAuth, checkRole("manager"), addUser);
router.get("/user", isAuth, checkRole("manager"), getUsers)

module.exports = router;