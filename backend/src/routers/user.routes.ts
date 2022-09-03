import express from 'express'
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)

userRouter.route('/login_admin').post(
    (req, res)=>new UserController().login_admin(req, res)
)

userRouter.route('/register').post(
    (req, res)=>new UserController().register(req, res)
)

userRouter.route('/dodaj').post(
    (req, res)=>new UserController().dodavanje(req, res)
)

userRouter.route('/promeni-lozinku').post(
    (req, res)=>new UserController().promeni(req, res)
)

export default userRouter;