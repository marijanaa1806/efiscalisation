import express from 'express'
import { opendir } from 'fs';
import { OrderedBulkOperation } from 'mongodb';

import korModel from '../models/korisnik'
import predModel from '../models/preduzece';
export class KorisnikController{
    prijavaNaSistem = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;

        
         korModel.findOne({'kor_ime': kor_ime, 'lozinka': lozinka}, (err, korisnik)=>{
            if(err) console.log(err);
            else res.json(korisnik)
        })
    }

    dohvatiKorisnika = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
       korModel.findOne({'kor_ime': kor_ime}, (err, korisnik)=>{
            if(err) console.log(err);
            else res.json(korisnik)
        })
    }
    dohvatiMejl = (req: express.Request, res: express.Response)=>{
        let mejl = req.body.mejl;
       korModel.findOne({'mejl': mejl}, (err, korisnik)=>{
            if(err) console.log(err);
            else res.json(korisnik)
        })
    }
    dohvatiLk = (req: express.Request, res: express.Response)=>{
        let lk = req.body.lk;
       korModel.findOne({'brLk': lk}, (err, korisnik)=>{
            if(err) console.log(err);
            else res.json(korisnik)
        })
    }
    promeniLoz=(req:express.Request,res:express.Response)=>{
        let lozinka=req.body.loz1;
        let noval=req.body.loz2;
        korModel.updateOne({'lozinka': lozinka}, {$set: {'lozinka': noval}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'updated'})
        })

    }
    regisPred=(req:express.Request,res:express.Response)=>{
       
        let odobr=true;
             let kor=new korModel({
                 kor_ime:req.body.kor_ime,
                lozinka:req.body.lozinka,
                ime:req.body.ime,
                prezime:req.body.prezime,
                 mejl:req.body.mejl,
                 tip:'p',
                 broj:req.body.broj,
                 brLk:0
                
            })
            let pred=new predModel({
                kor_ime:req.body.kor_ime,
                naziv:req.body.naziv,
                adresa:req.body.adresa,
                PIB:req.body.pib,
                matBr:req.body.mat,
              odobreno:odobr,
              aktivno:false,
              magacini:null,
              kase:null,
              ziro:null,
              pdv:false,
              kategorije:null,
              sifre:[],
              narucioci:[],
              artikli:[],
              slika:req.body.slika,
              pazari:[],
              prvi:false,
              ostali:false
              
              
            })
            kor.save((err, resp)=>{
            
            })
          
            pred.save((err, resp)=>{
                if(err) console.log(err)
                else {
                    res.json({'message': 'ok'})
                }
            })
          
     }
    registrujSe=(req:express.Request,res:express.Response)=>{
       let tipk=req.body.tipKor;
       let odobr=false;
       
      if(tipk=='a'){
odobr=true;
      }
            let kor=new korModel({
                kor_ime:req.body.kor_ime,
               lozinka:req.body.lozinka,
               ime:req.body.ime,
               prezime:req.body.prezime,
                mejl:req.body.mejl,
                tip:'p',
                broj:req.body.broj,
                brLk:0
               
           })
           let pred=new predModel({
               kor_ime:req.body.kor_ime,
               naziv:req.body.naziv,
               adresa:req.body.adresa,
               PIB:req.body.pib,
               matBr:req.body.mat,
             odobreno:odobr,
             aktivno:false,
             magacini:null,
             kase:null,
             ziro:null,
             pdv:false,
             kategorije:null,
             sifre:[],
             narucioci:[],
             artikli:[],
             slika:req.body.slika,
             pazari:[],
             prvi:false,
             ostali:false
           
             
           })
           kor.save((err, resp)=>{
            
             
           })
         
           pred.save((err, resp)=>{
            if(err) console.log(err)
            else {
                res.json({'message': 'ok'})
            }
        })

        
        
       
    }
    unos=(req:express.Request,res:express.Response)=>{
       
        let kor=new korModel({
            kor_ime:req.body.kor_ime,
           lozinka:req.body.lozinka,
           ime:req.body.ime,
           prezime:req.body.prezime,
            tip:'k',
            broj:req.body.broj,
            brLk:req.body.brLk
           
       })
       kor.save((err, resp)=>{
        if (err) {
           // console.log('There was a duplicate key error');
            return res.status(400).json({"message": "error"});
          } else {
            res.json({"message": "ok"})
          }
         
       })
    }
}

