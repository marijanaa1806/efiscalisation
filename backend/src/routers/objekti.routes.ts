import express from 'express';
import ObjektiController from '../controllers/objekti.controller';
const objektiRouter = express.Router();
objektiRouter.route('/unesiOb').post((req, res)=> new ObjektiController().unesiOb(req,res))
objektiRouter.route('/getObjekte').post((req, res)=> new ObjektiController().getObjekte(req,res))
objektiRouter.route('/ubaciSto').post((req, res)=> new ObjektiController().ubaciSto(req,res))
objektiRouter.route('/zauzmiSto').post((req, res)=> new ObjektiController().zauzmiSto(req,res))
objektiRouter.route('/oslobodiSto').post((req, res)=> new ObjektiController().oslobodiSto(req,res))
objektiRouter.route('/izmeniSto').post((req, res)=> new ObjektiController().izmeniSto(req,res))



export default objektiRouter;