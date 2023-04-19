import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Magacin } from '../model/magacin';
import { Narucilac } from '../model/narucilac';
import { Objekat } from '../model/objekat';
import { Preduzece } from '../model/preduzece';
import { Racun } from '../model/racun';
import { Robe } from '../model/robe';
import { Sto } from '../model/sto';
import { PreduzeceService } from '../preduzece.service';
import { RacunService } from '../racun.service';
import { DatePipe } from '@angular/common';
import { Artikal } from '../model/artikal';

@Component({
  selector: 'app-izd-rac',
  templateUrl: './izd-rac.component.html',
  styleUrls: ['./izd-rac.component.css']
})
export class IzdRacComponent implements OnInit {

  constructor(private predser:PreduzeceService,private racser:RacunService,private router:Router) { 
   

  }
  pred:Preduzece;
  magac:Array<Magacin>;
  robe:Array<Robe>=new Array<Robe>();
  robe2:Robe[]=[]
  stavke:Array<Robe>;
  ngOnInit(): void {
    localStorage.removeItem('izdavanje')
    let predz=JSON.parse(localStorage.getItem('ulogovan'))
    this.sto=JSON.parse(localStorage.getItem('sto'))
    this.obj=JSON.parse(localStorage.getItem('objekat'))
    this.predser.getJednoPred(predz.kor_ime).subscribe((data: Preduzece)=>{
      this.pred = data;
      this.magac=data.magacini;
      this.narucioci=data.narucioci;
      this.artikli=data.artikli;
      if(this.sto.zauzet==false){
        this.racun=new Racun();
        this.stavke=new Array<Robe>();
        
    this.racun.idS=this.sto.ids;
    this.racun.objekat=this.obj.naziv;
    this.racun.zatvoren=false;
    this.racun.preduz=predz.kor_ime;
      }else{
        this.racser.dohvatiRacun(this.obj.naziv,this.sto.ids,predz.kor_ime).subscribe((data1:Racun)=>{
          this.racun=data1;
          this.stavke=data1.stavke;
    this.racun.idS=this.sto.ids;
    this.racun.objekat=this.obj.naziv;
    this.racun.zatvoren=false;
    this.racun.preduz=predz.kor_ime;
        })
      }
   
    })
    this.robe2=new Array<Robe>();
    this.predser.mojeR(predz.kor_ime).subscribe((data:Robe[])=>{
      this.robe2=data;
      for(let j=0;j<this.robe2.length;j++){
        for(let i=0;i<this.artikli.length;i++){
          if(this.robe2[j].artikal==this.artikli[i].sifra){
            this.robe2[j].nazAr=this.artikli[i].naziv;
          }
        }

      }
      let izm=JSON.parse(localStorage.getItem('izabranM'));
      if(izm){
        this.robe=new Array<Robe>();
        for(let i=0;i<this.robe2.length;i++){
          if(this.robe2[i].nazivm==izm){
            this.robe.push(this.robe2[i]);
          }
        }
        this.prikz=true;
        localStorage.removeItem('izabranM')
      }
    })
   
  }
  
  today = new Date();
  changedDate:string;
 artikli:Artikal[]=[]
  
  sto:Sto;
  obj:Objekat
  racun:Racun;
  nazivm:string;
 

  zaPlacanje:number;
  ime:string;
  prezime:string;
  brlk:string;
  dato:number;
  vrati:number;
  slip:string;
  nar:string;
  narucioci:Array<Narucilac>=new Array<Narucilac>();

  porez:number;
  izaberi(r){
    r.selected=true;

  }
  plati(){
    this.vrati=this.dato-this.zaPlacanje;
    if(this.vrati<0){
      alert('niste uneli dovoljno novca');
      return;
    }
    var dd = String(this.today.getDate()).padStart(2, '0');
    var mm = String(this.today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = this.today.getFullYear();
    this.changedDate = yyyy + "-" + mm + "-" + dd
    this.racser.unesiDetalje(this.changedDate,this.porez,this.zaPlacanje,this.obj.naziv,this.sto.ids,this.pred.kor_ime,this.dato,this.vrati,this.ime,this.prezime,this.brlk,this.tipPlacanja,this.slip,this.nar).subscribe(resp=>{

      this.racser.zatvoriRacun(this.obj.naziv,this.sto.ids,this.pred.kor_ime).subscribe();
      this.racser.oslobodiSto(this.obj.naziv,this.sto.ids,this.pred.kor_ime).subscribe();
      this.racser.uvecajPazar(this.pred.kor_ime,this.changedDate,this.zaPlacanje,this.porez).subscribe();
    });
   
  }
  unesiS(r){
    if(r.stanje<r.kolicina){
      alert("nema dovoljno stavke na stanju")
      return;
    }
    if(this.stavke.length==0){
      this.racser.dodajRac(this.racun).subscribe(resp=>{
        if(resp['message']=='ok'){
          this.racser.zauzmiSto(this.obj.naziv,this.sto.ids,this.pred.kor_ime).subscribe(res=>{
            if(res['message']=='ok'){
              this.stavke.push(r);
              this.racser.ubaciStavku(this.obj.naziv,this.sto.ids,this.pred.kor_ime,r).subscribe();
              this.racser.umanjiAr(r.artikal,r.magacin,r.kolicina,this.pred.kor_ime).subscribe(reso=>{
                if(reso){
                  let novsto=JSON.parse(localStorage.getItem('sto'));
                  novsto.zauzet=true;
                  localStorage.setItem('sto',JSON.stringify(novsto))
                  localStorage.setItem('izabranM',JSON.stringify(this.nazivm));
                  this.ngOnInit();
                }
              });
            }
          });
        }
    

      });
    }else{
      this.stavke.push(r);
      this.racser.ubaciStavku(this.obj.naziv,this.sto.ids,this.pred.kor_ime,r).subscribe();
      this.racser.umanjiAr(r.artikal,r.magacin,r.kolicina,this.pred.kor_ime).subscribe(reso=>{
        if(reso){
          localStorage.setItem('izabranM',JSON.stringify(this.nazivm));
          this.ngOnInit();
        }
       
      });

    }
  }

  sifra:string;
  prikz:boolean;
  prikazi(){
    this.robe=new Array<Robe>();
    for(let i=0;i<this.robe2.length;i++){
      if(this.robe2[i].nazivm==this.nazivm){
        this.robe.push(this.robe2[i]);
      }
    }
    this.prikz=true;
  }
  logout(){
    localStorage.removeItem('ulogovan');
    this.router.navigate(['']);
  }
  zatvori:boolean;
  tipPlacanja:string;
  zatvaranjeRac(){
    this.zatvori=true;
    this.zaPlacanje=0;
    for(let i=0;i<this.stavke.length;i++){
     
        for(let j=0;j<this.pred.artikli.length;j++){
         
          if(this.stavke[i].artikal==this.pred.artikli[j].sifra){
           
            if(this.pred.pdv==true){
              let m=Number(this.stavke[i].prodajna)*this.pred.artikli[j].stopa/100+Number(this.stavke[i].prodajna)
              if(this.stavke[i].kolicina!=0){
                this.zaPlacanje+=m*this.stavke[i].kolicina;
                this.porez=Number(this.stavke[i].prodajna)*this.pred.artikli[j].stopa/100*this.stavke[i].kolicina;

              }
            }else{
             
              if(this.stavke[i].kolicina!=0){
                this.zaPlacanje+=Number(this.stavke[i].prodajna)*this.stavke[i].kolicina;
              }
            }

          }
        }
    }
    alert('za uplatu'+this.zaPlacanje)
    
  }
  zavrsiPlacanje(){
    this.racser.oslobodiSto(this.obj.naziv,this.sto.ids,this.pred.kor_ime).subscribe();
  }
}
