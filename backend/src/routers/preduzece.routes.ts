import express from 'express';
import { PreduzeceController } from '../controllers/preduzece.controller';

const predRouter = express.Router();

predRouter.route('/svaPreduzeca').get(
    (req, res)=> new PreduzeceController().getPreduzeca(req,res)
)
predRouter.route('/aktiviraj').post((req, res)=> new PreduzeceController().aktiviraj(req,res))
predRouter.route('/deaktiviraj').post((req, res)=> new PreduzeceController().deaktiviraj(req,res))
predRouter.route('/prihvati').post((req, res)=> new PreduzeceController().prihvati(req,res))
predRouter.route('/odbij').post((req, res)=> new PreduzeceController().odbij(req,res))
predRouter.route('/updatepod').post((req, res)=> new PreduzeceController().updatepod(req,res))

predRouter.route('/getJednoPred').post((req, res)=> new PreduzeceController().getJednoPred(req,res))

predRouter.route('/prviLog').post((req, res)=> new PreduzeceController().prviLog(req,res))
predRouter.route('/ostaliLog').post((req, res)=> new PreduzeceController().ostaliLog(req,res))


predRouter.route('/nadji').get(
    (req, res)=> new PreduzeceController().nadji(req,res)
)

predRouter.route('/ubaciNar').post((req, res)=> new PreduzeceController().ubaciNar(req,res))
predRouter.route('/ubaciNar1').post((req, res)=> new PreduzeceController().ubaciNar1(req,res))
predRouter.route('/izmeni').post((req, res)=> new PreduzeceController().izmeni(req,res))
predRouter.route('/obrisi').post((req, res)=> new PreduzeceController().obrisi(req,res))
predRouter.route('/dodaj').post((req, res)=> new PreduzeceController().dodaj(req,res))
predRouter.route('/dodeli').post((req, res)=> new PreduzeceController().dodeli(req,res))

predRouter.route('/izmeniMag').post((req, res)=> new PreduzeceController().izmeniMag(req,res))
predRouter.route('/izmeniKasu').post((req, res)=> new PreduzeceController().izmeniKasu(req,res))
predRouter.route('/izmeniZiro').post((req, res)=> new PreduzeceController().izmeniZiro(req,res))
predRouter.route('/izmeniPodatke').post((req, res)=> new PreduzeceController().izmeniPodatke(req,res))



export default predRouter;