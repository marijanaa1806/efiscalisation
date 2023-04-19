
import express from 'express'
import predModel from '../models/preduzece';
import korModel from '../models/korisnik'
export class PreduzeceController{
    getPreduzeca = (req: express.Request, res: express.Response)=>{
        predModel.find({}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
        })

    }
    nadji= (req: express.Request, res: express.Response)=>{
        let searchparam = req.query.param;

        predModel.findOne({'PIB': searchparam}, (err, pred)=>{
            if(err) console.log(err)
            else res.json(pred)
        })

    }
    prviLog= (req: express.Request, res: express.Response)=>{
        let kor = req.body.kor;

        predModel.updateOne({'kor_ime': kor},{$set:{'prvi':true}}, (err, pred)=>{
            if(err) console.log(err)
            else res.json(pred)
        })

    }
    ostaliLog= (req: express.Request, res: express.Response)=>{
        let kor = req.body.kor;

        predModel.updateOne({'kor_ime': kor},{$set:{'prvi':false}}, (err, pred)=>{
           
        })
        predModel.updateOne({'kor_ime': kor},{$set:{'ostali':true}}, (err, pred)=>{
            if(err) console.log(err)
            else res.json(pred)
        })

    }
    ubaciNar= (req: express.Request, res: express.Response)=>{
        let pib=req.body.pib;
        let kor=req.body.k_ime;
        let nr=req.body.nr;
        predModel.findOne({'PIB':pib}, (err, pred)=>{
            if(err) console.log(err)
            else {
                if(pred){
                    nr.preduzece=pred;
                    predModel.updateOne({'kor_ime': kor }, {$push: {'narucioci': nr}}, (err, resp)=>{
                        if(err) console.log(err)
                        else {
                            res.json({'message': 'ok'})
                        }
                    })
                }
            }
        })
    }
    ubaciNar1= (req: express.Request, res: express.Response)=>{

        let kor=req.body.k_ime;
        let nr=req.body.nr;
        
                    predModel.updateOne({'kor_ime': kor }, {$push: {'narucioci': nr}}, (err, resp)=>{
                        if(err) console.log(err)
                        else {
                            res.json({'message': 'ok'})
                        }
                    })
                
    }
    dodeli=(req: express.Request, res: express.Response)=>{
        let ki=req.body.koris;
        let kat=req.body.kat;
        let pk=req.body.potk;
        let sif=req.body.sif;
        predModel.updateOne({'kor_ime': ki}, {$set: {"artikli.$[ar].kateg": kat}}, {arrayFilters: [{
            "ar.sifra": sif
        }]}, (err, resp)=>{
           
        })
        predModel.updateOne({'kor_ime': ki}, {$set: {"artikli.$[ar].potk": pk}}, {arrayFilters: [{
            "ar.sifra": sif
        }]}, (err, resp)=>{
           
        })
        predModel.updateOne({'kor_ime': ki}, {$set: {"artikli.$[ar].k": true}}, {arrayFilters: [{
            "ar.sifra": sif
        }]}, (err, resp)=>{
           
        })
    }
    izmeni=(req: express.Request, res: express.Response)=>{
        let koris=req.body.kor;
        let art=req.body.n;
        predModel.updateOne({'kor_ime': koris}, {$set: {"artikli.$[ar].naziv": art.naziv}}, {arrayFilters: [{
            "ar.sifra": art.sifra
        }]}, (err, resp)=>{
           
        })
        predModel.updateOne({'kor_ime': koris}, {$set: {"artikli.$[ar].stopa": art.stopa}}, {arrayFilters: [{
            "ar.sifra": art.sifra
        }]}, (err, resp)=>{
           
        })
        predModel.updateOne({'kor_ime': koris}, {$set: {"artikli.$[ar].jedinica": art.jedinica}}, {arrayFilters: [{
            "ar.sifra": art.sifra
        }]}, (err, resp)=>{
          
        })
        predModel.updateOne({'kor_ime': koris}, {$set: {"artikli.$[ar].proizvodjac": art.proizvodjac}}, {arrayFilters: [{
            "ar.sifra": art.sifra
        }]}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'ok'})
            }
           
        })
        
       

    }
    obrisi=(req: express.Request, res: express.Response)=>{
        let koris=req.body.kor;
        let art=req.body.n;
        predModel.updateOne({'kor_ime': koris }, {$pull: {'artikli': art}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'ok'})
            }
        })

    }
    dodaj=(req: express.Request, res: express.Response)=>{
        let koris=req.body.kor;
        let art=req.body.n;
        predModel.updateOne({'kor_ime': koris }, {$push: {'artikli': art}}, (err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'ok'})
            }
        })

    }
   
    prihvati=(req: express.Request, res: express.Response)=>{

        let pib=req.body.pib;
        predModel.updateOne({'PIB':pib},{$set:{'odobreno':true}},(err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }
    izmeniPodatke=(req: express.Request, res: express.Response)=>{
        let kor=req.body.kor
        let ime=req.body.ime;
        let prez=req.body.prez;
        let mejl=req.body.mejl;
        let br=req.body.br;
        let sifre=req.body.sifre;
        let kat=req.body.kat;
        let pdv=req.body.pdv
        predModel.updateOne({'kor_ime':kor},{$set:{'sifre':sifre}},(err, resp)=>{
            
        })
        predModel.updateOne({'kor_ime':kor},{$set:{'kategorije':kat}},(err, resp)=>{
           
        })
        predModel.updateOne({'kor_ime':kor},{$set:{'pdv':pdv}},(err, resp)=>{
           
        })
        korModel.updateOne({'kor_ime':kor},{$set:{'ime':ime}},(err, resp)=>{
          
        })
        korModel.updateOne({'kor_ime':kor},{$set:{'prezime':prez}},(err, resp)=>{
            
        })
        korModel.updateOne({'kor_ime':kor},{$set:{'mejl':mejl}},(err, resp)=>{
           
        })
        korModel.updateOne({'kor_ime':kor},{$set:{'broj':br}},(err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }
    izmeniMag=(req: express.Request, res: express.Response)=>{

        let kor=req.body.kor;
        let stari=req.body.stari
        let idd=req.body.idd
        let naz=req.body.nazi
       predModel.updateOne({'kor_ime': kor}, {$set: {"magacini.$[mag].id": idd}}, {arrayFilters: [{
            "mag.id": stari.id
        }]}, (err, resp)=>{
           
        })
        predModel.updateOne({'kor_ime': kor}, {$set: {"magacini.$[mag].naziv": naz}}, {arrayFilters: [{
            "mag.naziv": stari.naziv
        }]}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }
    izmeniZiro=(req: express.Request, res: express.Response)=>{

        let kor=req.body.kor;
        let stari=req.body.stari
        let broj=req.body.broj
        let banka=req.body.banka
        predModel.updateOne({'kor_ime': kor}, {$set: {"ziro.$[zi].banka": banka}}, {arrayFilters: [{
            "zi.banka": stari.banka
        }]}, (err, resp)=>{
           
        })
        predModel.updateOne({'kor_ime': kor}, {$set: {"ziro.$[zi].brojR": broj}}, {arrayFilters: [{
            "zi.brojR": stari.brojR
        }]}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }
    izmeniKasu=(req: express.Request, res: express.Response)=>{

        let kor=req.body.kor;
        let stari=req.body.stari
        let lok=req.body.lok
        let tip=req.body.tip
        predModel.updateOne({'kor_ime': kor}, {$set: {"kase.$[k].tip": tip}}, {arrayFilters: [{
            "k.tip": stari.tip
        }]}, (err, resp)=>{
           
        })
        predModel.updateOne({'kor_ime': kor}, {$set: {"kase.$[k].lokacija": lok}}, {arrayFilters: [{
            "k.lokacija": stari.lokacija
        }]}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }
    aktiviraj=(req: express.Request, res: express.Response)=>{

        let pib=req.body.pib;
        predModel.updateOne({'PIB':pib},{$set:{'aktivno':true}},(err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }
    deaktiviraj=(req: express.Request, res: express.Response)=>{

        let pib=req.body.pib;
        predModel.updateOne({'PIB':pib},{$set:{'aktivno':false}},(err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }
    odbij=(req: express.Request, res: express.Response)=>{
        let pib=req.body.pib;
        predModel.deleteOne({'PIB':pib},(err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })

    }
    getJednoPred=(req: express.Request, res: express.Response)=>{
        let kim=req.body.kor_ime
        predModel.findOne({'kor_ime':kim}, (err, pred)=>{
            if(err) console.log(err)
            else res.json(pred)
        })
    }

   updatepod=(req: express.Request, res: express.Response)=>{
    let mags=req.body.mags;
    let kase=req.body.kase;
    let ziro=req.body.ziro;
    let kat=req.body.kat;
    let sifre=req.body.sifre;
    let jeste=req.body.jeste;
    let koris=req.body.kors;
    let url=req.body.url;
   
  
        predModel.updateOne({'kor_ime': koris}, 
        {$set: {"ziro": ziro}}, (err, resp)=>{
          
        });
        predModel.updateOne({'kor_ime': koris}, 
        {$set: {"difolt": url}}, (err, resp)=>{
          
        });
        predModel.updateOne({'kor_ime': koris}, 
        {$set: {"magacini": mags}}, (err, resp)=>{
          
        });
    
        predModel.updateOne({'kor_ime': koris}, 
        {$set: {"kase": kase}}, (err, resp)=>{
          
        });
    
        predModel.updateOne({'kor_ime': koris}, 
        {$set: {"sifre": sifre}}, (err, resp)=>{
          
        });
    
    predModel.updateOne({'kor_ime': koris}, 
    {$set: {"pdv": jeste}}, (err, resp)=>{
      
    });
    predModel.updateOne({'kor_ime': koris}, 
    {$set: {"kategorije": kat}}, (err, resp)=>{
      
    });
   
   }
   
}
export default PreduzeceController;