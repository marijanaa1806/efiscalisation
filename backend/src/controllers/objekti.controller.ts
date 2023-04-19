import express from 'express'
import objekatModel from '../models/objekti'
import racunModel from '../models/racun'
export class ObjektiController{
    unesiOb=(req:express.Request,res:express.Response)=>{
        let ob=new objekatModel({
            naziv:req.body.ob.naziv,
           stolovi:req.body.ob.stolovi,
            preduzece:req.body.ob.preduzece
           
       })
       ob.save((err, resp)=>{
           if (err) {
              // console.log('There was a duplicate key error');
               return res.status(400).json({"message": "error"});
             } else {
               res.json({"message": "ok"})
             }
            
          })

    }
    ubaciSto=(req:express.Request,res:express.Response)=>{
        let naz=req.body.obj;
        let sto=req.body.sto;
        let pred=req.body.pred
        
        objekatModel.updateOne({'naziv': naz,'preduzece':pred }, {$push: {'stolovi': sto}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'ok'})
            }
        })
    }
    izmeniSto=(req:express.Request,res:express.Response)=>{
        let naz=req.body.ob;
        let sto=req.body.sto;
        let pred=req.body.pred
        
        objekatModel.updateOne({'naziv': naz,'preduzece':pred },  {$set: {"stolovi.$[st].xkoor": sto.xkoor}}, {arrayFilters: [{
            "st.ids": sto.ids
        }]}, (err, resp)=>{
           
        })
        objekatModel.updateOne({'naziv': naz,'preduzece':pred },  {$set: {"stolovi.$[st].ykoor": sto.ykoor}}, {arrayFilters: [{
            "st.ids": sto.ids
        }]}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'ok'})
            }
        })
    }
    zauzmiSto=(req:express.Request,res:express.Response)=>{
        let naz=req.body.ob;
        let sto=req.body.ids;
        let pred=req.body.pred
        
        objekatModel.updateOne({'naziv': naz,'preduzece':pred },  {$set: {"stolovi.$[st].zauzet": true}}, {arrayFilters: [{
            "st.ids": sto
        }]}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'ok'})
            }
        })
    }
    oslobodiSto=(req:express.Request,res:express.Response)=>{
        let naz=req.body.ob;
        let sto=req.body.ids;
        let pred=req.body.pred
        
        objekatModel.updateOne({'naziv': naz,'preduzece':pred },  {$set: {"stolovi.$[st].zauzet": false}}, {arrayFilters: [{
            "st.ids": sto
        }]}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'ok'})
            }
        })
    }
   
    getObjekte=(req:express.Request,res:express.Response)=>{
        let kor=req.body.kor;
        objekatModel.find({'preduzece':kor},(err, objk)=>{
            if(err) console.log(err)
            else res.json(objk)
        })
    }

   
}
export default ObjektiController;