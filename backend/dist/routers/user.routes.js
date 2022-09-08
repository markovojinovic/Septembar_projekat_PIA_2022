"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/login_admin').post((req, res) => new user_controller_1.UserController().login_admin(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/promeni_ulogu').post((req, res) => new user_controller_1.UserController().promeni_ulogu(req, res));
userRouter.route('/dodaj').post((req, res) => new user_controller_1.UserController().dodavanje(req, res));
userRouter.route('/obrisi').post((req, res) => new user_controller_1.UserController().obrisi(req, res));
userRouter.route('/izmena').post((req, res) => new user_controller_1.UserController().izmena(req, res));
userRouter.route('/promeni-lozinku').post((req, res) => new user_controller_1.UserController().promeni(req, res));
userRouter.route('/sviZahtevi').get((req, res) => new user_controller_1.UserController().sviZahtevi(req, res));
userRouter.route('/sviKorisnici').get((req, res) => new user_controller_1.UserController().sviKorisnici(req, res));
userRouter.route('/odobri').post((req, res) => new user_controller_1.UserController().prihvati(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map