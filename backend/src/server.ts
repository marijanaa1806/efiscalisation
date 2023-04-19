import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import korisnikRouter from './routers/korisnik.routes';
import predRouter from './routers/preduzece.routes';
import robeRouter from './routers/robe.routes';
import objektiRouter from './routers/objekti.routes';
import racunRouter from './routers/racun.routes';


const app = express();
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://localhost:27017/projekat')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/user', korisnikRouter);
router.use('/objekti', objektiRouter);
router.use('/preduzece', predRouter);
router.use('/robe',robeRouter)
router.use('/racun',racunRouter)

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
