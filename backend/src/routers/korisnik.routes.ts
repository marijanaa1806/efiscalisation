import express from 'express';
import { KorisnikController } from '../controllers/korisnik.controller';

const korisnikRouter = express.Router();

korisnikRouter.route('/prijavaNaSistem').post(
    (req, res)=> new KorisnikController().prijavaNaSistem(req, res)
)

korisnikRouter.route('/dohvatiKorisnika').post(
    (req, res)=> new KorisnikController().dohvatiKorisnika(req, res)
)
korisnikRouter.route('/dohvatiMejl').post(
    (req, res)=> new KorisnikController().dohvatiMejl(req, res)
)
korisnikRouter.route('/dohvatiLk').post(
    (req, res)=> new KorisnikController().dohvatiLk(req, res)
)
korisnikRouter.route('/registrujSe').post(
    (req, res)=> new KorisnikController().registrujSe(req,res)
)


korisnikRouter.route('/regisPred').post(
    (req, res)=> new KorisnikController().regisPred(req,res)
)
korisnikRouter.route('/promeniLoz').post(
    (req, res)=> new KorisnikController().promeniLoz(req,res)
)
korisnikRouter.route('/unos').post(
    (req, res)=> new KorisnikController().unos(req,res)
)


export default korisnikRouter;