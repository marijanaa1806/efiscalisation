import express from 'express';

import RacunController from '../controllers/racun.controller';
const racunRouter = express.Router();
racunRouter.route('/dodajRac').post((req, res)=> new RacunController().dodajRac(req,res))
racunRouter.route('/dohvatiRacun').post((req, res)=> new RacunController().dohvatiRacun(req,res))
racunRouter.route('/ubaciStavku').post((req, res)=> new RacunController().ubaciStavku(req,res))
racunRouter.route('/zatvoriRacun').post((req, res)=> new RacunController().zatvoriRacun(req,res))

racunRouter.route('/unesiDetalje').post((req, res)=> new RacunController().unesiDetalje(req,res))
racunRouter.route('/uvecajPazar').post((req, res)=> new RacunController().uvecajPazar(req,res))
racunRouter.route('/dnevni').post((req, res)=> new RacunController().dnevni(req,res))
racunRouter.route('/mojiR').post((req, res)=> new RacunController().mojiR(req,res))
racunRouter.route('/sortirani').get((req, res)=> new RacunController().sortirani(req,res))


export default racunRouter;