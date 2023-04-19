import express from 'express'
import robaModel from '../models/robe'
export class RobeController{
    sveR=(req:express.Request,res:express.Response)=>{
        robaModel.find({}, (err, rob)=>{
            if(err) console.log(err)
            else res.json(rob)
        })
    }
    mojeR=(req:express.Request,res:express.Response)=>{
        let k=req.body.kime;
        robaModel.find({'preduzece':k}, (err, rob)=>{
            if(err) console.log(err)
            else res.json(rob)
        })
    }
    izbaciRobu=(req:express.Request,res:express.Response)=>{
        let k=req.body.kime;
        let sif=req.body.sifra
        robaModel.deleteMany({'preduzece':k,'artikal':sif}, (err, rob)=>{
            if(err) console.log(err)
            else res.json(rob)
        })
    }
    izmeniRobu=(req:express.Request,res:express.Response)=>{
        let k=req.body.kor;
        let r=req.body.roba
        robaModel.updateOne({'preduzece':k,'artikal':r.artikal,'magacin':r.magacin},{$set:{'prodajna':r.prodajna}}, (err, rob)=>{
          
        })
        robaModel.updateOne({'preduzece':k,'artikal':r.artikal,'magacin':r.magacin},{$set:{'max':r.max}}, (err, rob)=>{
          
        })
        robaModel.updateOne({'preduzece':k,'artikal':r.artikal,'magacin':r.magacin},{$set:{'min':r.min}}, (err, rob)=>{
           
        })
        robaModel.updateOne({'preduzece':k,'artikal':r.artikal,'magacin':r.magacin},{$set:{'stanje':r.stanje}}, (err, rob)=>{
          
        })
        robaModel.updateOne({'preduzece':k,'artikal':r.artikal,'magacin':r.magacin},{$set:{'nabavna':r.nabavna}}, (err, rob)=>{
            if(err) console.log(err)
            else res.json(rob)
        })
    }
    obrisiRobu=(req:express.Request,res:express.Response)=>{
        let k=req.body.kor;
        let sif=req.body.sifra
         let m=req.body.mag;
        robaModel.deleteOne({'preduzece':k,'artikal':sif,'magacin':m}, (err, rob)=>{
            if(err) console.log(err)
            else res.json(rob)
        })
    }
    mojiArtikli=(req:express.Request,res:express.Response)=>{
        let k=req.body.kime;
        let sif=req.body.sifra
        robaModel.find({'preduzece':k,'artikal':sif}, (err, rob)=>{
            if(err) console.log(err)
            else res.json(rob)
        })
    }
    umanjiAr=(req:express.Request,res:express.Response)=>{
        let sifra=req.body.sifra;
        let mag=req.body.mag;
        let kol=req.body.kol;
        robaModel.updateOne({'magacin':mag,'artikal':sifra,'preduzece':req.body.kor},{$inc:{'stanje':-kol}}, (err, rob)=>{
            if(err) console.log(err)
            else res.json(rob)
        })

    }
    unesirobu=(req:express.Request,res:express.Response)=>
    {

        let rob=new robaModel({
             magacin:req.body.mag,
            nabavna:req.body.nab,
             prodajna:req.body.prod,
             max:req.body.maxc,
             min:req.body.minc,
             stanje:req.body.stanje,
             nazivm:req.body.nazivmag,
             artikal:req.body.sifAr,
             selected:false,
             kolicina:0,
             nazAr:req.body.nazar,
             preduzece:req.body.pred,
             
        })
        rob.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
             
           })
    }


}
export default RobeController;