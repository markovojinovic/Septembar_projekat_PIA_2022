import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routers/user.routes';

const app = express();
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://localhost:27017/PIA_Projekat_Septembar_2022')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('Otvorila se konekcija sa bazom')
})

const router = express.Router();
router.use('/users', userRouter)
// router.use('/news', newsRouter)
//ovde idu ruteri za razlicite potrebe

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));