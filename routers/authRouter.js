const Router = require('../utils/router.js');
const authController = require("../controllers/authController");
const { authRoutes } = require("../settings/_serverSettings");

const authRouter = new Router();
authRouter.post(authRoutes.signup.route, authController.signup);
authRouter.post(authRoutes.login.route, authController.login);
authRouter.post(authRoutes.signup_superuser.route, authController.signup_SuperUser)
authRouter.get(authRoutes.logout.route, authController.logout);


module.exports = authRouter