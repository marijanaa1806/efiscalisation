import express from 'express';
import RobeController from '../controllers/robe.controller';
const robeRouter = express.Router();
robeRouter.route('/unesirobu').post((req, res)=> new RobeController().unesirobu(req,res))
robeRouter.route('/sveRobe').get(
    (req, res)=> new RobeController().sveR(req,res)
)
robeRouter.route('/umanjiAr').post((req, res)=> new RobeController().umanjiAr(req,res))
robeRouter.route('/mojeR').post((req, res)=> new RobeController().mojeR(req,res))
robeRouter.route('/izbaciRobu').post((req, res)=> new RobeController().izbaciRobu(req,res))
robeRouter.route('/izmeniRobu').post((req, res)=> new RobeController().izmeniRobu(req,res))

robeRouter.route('/obrisiRobu').post((req, res)=> new RobeController().obrisiRobu(req,res))

robeRouter.route('/mojiArtikli').post((req, res)=> new RobeController().mojiArtikli(req,res))



export default robeRouter;