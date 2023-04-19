import express from 'express'
import racunModel from '../models/racun'
import preduzeceModel from '../models/preduzece'
export class RacunController{

   
    dohvatiRacun=(req:express.Request,res:express.Response)=>{
        let naz=req.body.ob;
        let sto=req.body.ids;
        let pred=req.body.pred
        racunModel.findOne({'idS':sto,'objekat':naz,'preduz':pred,'zatvoren':false},(err, rac)=>{
            if(err) console.log(err)
            else res.json(rac)
        })

    }
    sortirani=(req:express.Request,res:express.Response)=>{
        
        racunModel.find({},(err, rac)=>{
            rac.sort((a,b)=>(
                a.datum<=b.datum?-1:1
            ))
            if(err) console.log(err)
            else res.json(rac)
        })

    }
    uvecajPazar=(req:express.Request,res:express.Response)=>{
        let korime=req.body.korime;
        let datum=req.body.datum;
        let iznos=req.body.iznos;
        let porez=req.body.porez
        preduzeceModel.findOne({'kor_ime':korime,'pazari.datum':datum},(err, resp)=>{
            if(err) console.log(err)
            else {
                if(resp==null){
                    let pz={
                        datum:datum,
                        iznos:iznos,
                        porez:porez
                    }
                    preduzeceModel.updateOne({'kor_ime': korime }, {$push: {'pazari': pz}}, (err, resp)=>{
                        if(err) console.log(err)
                        else {
                            res.json({'message': 'ok'})
                        }
                    })

                }
                else{
                    
                    preduzeceModel.updateOne({'kor_ime': korime }, {$inc: {"pazari.$[paz].porez": porez}}, {arrayFilters: [{
                        "paz.datum": datum
                    }]}, (err, resp)=>{
                        
                    })
                    preduzeceModel.updateOne({'kor_ime': korime }, {$inc: {"pazari.$[paz].iznos": iznos}}, {arrayFilters: [{
                        "paz.datum": datum
                    }]}, (err, resp)=>{
                        if(err) console.log(err)
                        else res.json({'message': 'ok'})
                    })

                }
            }
        })
        
    }
    ubaciStavku=(req:express.Request,res:express.Response)=>{
        let naz=req.body.ob;
        let sto=req.body.ids;
        let pred=req.body.pred;
        let st=req.body.st;
        racunModel.updateOne({'idS': sto,'objekat':naz,'preduz':pred,'zatvoren':false}, {$push: {"stavke": st}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }
    dnevni=(req:express.Request,res:express.Response)=>{
        let kor=req.body.kor;
        racunModel.find({'preduz':kor},(err, news)=>{
            if(err) console.log(err)
            else res.json(news)
        })
        

    }
    mojiR=(req:express.Request,res:express.Response)=>{
        let lk=req.body.lk;
        racunModel.find({'brLk':lk},(err, news)=>{
            if(err) console.log(err)
            else res.json(news)
        })
        

    }
    unesiDetalje=(req:express.Request,res:express.Response)=>{
        let iznos=req.body.iznos;
        let porez=req.body.porez;
        let naz=req.body.ob;
        let sto=req.body.ids;
        let pred=req.body.pred;
        let dato=req.body.dato;
        let kusur=req.body.kusur;
        let ime=req.body.ime;
        let prez=req.body.prez;
        let lk=req.body.lk;
        let nacin=req.body.nacin;
        let slip=req.body.slip;
        let naruc=req.body.naruc;
        let datum=req.body.datum;
        racunModel.updateOne({'idS': sto,'objekat':naz,'preduz':pred,'zatvoren':false}, {$set: {"dato": dato}}, (err, resp)=>{
          
        })
        racunModel.updateOne({'idS': sto,'objekat':naz,'preduz':pred,'zatvoren':false}, {$set: {"kusur": kusur}}, (err, resp)=>{
          
        })
        racunModel.updateOne({'idS': sto,'objekat':naz,'preduz':pred,'zatvoren':false}, {$set: {"ime": ime}}, (err, resp)=>{
            
        })
        racunModel.updateOne({'idS': sto,'objekat':naz,'preduz':pred,'zatvoren':false}, {$set: {"prezime": prez}}, (err, resp)=>{
           
        })
        racunModel.updateOne({'idS': sto,'objekat':naz,'preduz':pred,'zatvoren':false}, {$set: {"brLk": lk}}, (err, resp)=>{
            
        })
        racunModel.updateOne({'idS': sto,'objekat':naz,'preduz':pred,'zatvoren':false}, {$set: {"nacinPlacanja": nacin}}, (err, resp)=>{
           
        })
        racunModel.updateOne({'idS': sto,'objekat':naz,'preduz':pred,'zatvoren':false}, {$set: {"slip": slip}}, (err, resp)=>{
           
        })
        racunModel.updateOne({'idS': sto,'objekat':naz,'preduz':pred,'zatvoren':false}, {$set: {"narucilac": naruc}}, (err, resp)=>{
           
        })
        racunModel.updateOne({'idS': sto,'objekat':naz,'preduz':pred,'zatvoren':false}, {$set: {"iznos": iznos}}, (err, resp)=>{
           
        })
        racunModel.updateOne({'idS': sto,'objekat':naz,'preduz':pred,'zatvoren':false}, {$set: {"datum": datum}}, (err, resp)=>{
           
        })
        racunModel.updateOne({'idS': sto,'objekat':naz,'preduz':pred,'zatvoren':false}, {$set: {"porez": porez}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'updated'})
        })
        


    }
    zatvoriRacun=(req:express.Request,res:express.Response)=>{
        let naz=req.body.ob;
        let sto=req.body.ids;
        let pred=req.body.pred;
        racunModel.updateOne({'idS': sto,'objekat':naz,'preduz':pred,'zatvoren':false}, {$set: {"zatvoren": true}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }
   
    dodajRac=(req:express.Request,res:express.Response)=>{
        let sto=req.body.r.idS;
        let obj=req.body.r.objekat;
        let z=req.body.r.zatvoren;
        let racun=new racunModel({
            idS:sto,
            objekat:obj,
            zatvoren:false,
            stavke:[],
            iznos:0,
            porez:0,
            datum:null,
            preduz:req.body.r.preduz,
            dato:0,
            kusur:0,
            ime:'',
            prezime:'',
            brLk:'',
            nacinPlacanja:'',
            slip:'',
            narucilac:''

        })
        
racun.save((err, resp)=>{
            if (err) {
                return res.status(400).json({"message": "error"});
              } else {
                res.json({"message": "ok"})
              }
             
           })

    }
}
export default RacunController;