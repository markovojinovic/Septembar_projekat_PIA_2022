import express from 'express'
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)

userRouter.route('/register').post(
    (req, res)=>new UserController().register(req, res)
)

userRouter.route('/dodaj').post(
    (req, res)=>new UserController().dodavanje(req, res)
)

export default userRouter;