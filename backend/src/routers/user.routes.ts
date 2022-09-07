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

userRouter.route('/obrisi').post(
    (req, res)=>new UserController().obrisi(req, res)
)

userRouter.route('/izmena').post(
    (req, res)=>new UserController().izmena(req, res)
)

userRouter.route('/promeni-lozinku').post(
    (req, res)=>new UserController().promeni(req, res)
)

userRouter.route('/sviZahtevi').get(
    (req, res)=>new UserController().sviZahtevi(req, res)
)

userRouter.route('/sviKorisnici').get(
    (req, res)=>new UserController().sviKorisnici(req, res)
)

userRouter.route('/odobri').post(
    (req, res)=>new UserController().prihvati(req, res)
)

export default userRouter;