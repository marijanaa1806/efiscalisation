import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Kasa } from '../model/kasa';
import { Korisnik } from '../model/korisnik';
import { Magacin } from '../model/magacin';
import { Preduzece } from '../model/preduzece';
import { ZiroRacun } from '../model/ziror';
import { PreduzeceService } from '../preduzece.service';

@Component({
  selector: 'app-podaci',
  templateUrl: './podaci.component.html',
  styleUrls: ['./podaci.component.css']
})
export class PodaciComponent implements OnInit {

  constructor(private router:Router,private predser:PreduzeceService,private korser:KorisnikService) { }

  ngOnInit(): void {
    let predz=JSON.parse(localStorage.getItem('ulogovan'))
    this.predser.getJednoPred(predz.kor_ime).subscribe((data: Preduzece)=>{
      this.pred = data;
      this.ime=predz.ime;
      this.prezime=predz.prezime;
      this.broj=predz.broj;
      this.mejl=predz.mejl;
      for(let i=0;i<this.pred.magacini.length;i++){
        this.pred.magacini[i].iz=false;
      }
      this.imeN=this.ime;
      this.prezN=this.prezime;
      this.mejlN=this.mejl;
      this.brojN=this.broj;
      this.pdvN=this.pred.pdv;
      this.katN=this.pred.kategorije;
      this.sifre=this.pred.sifre;


    
    })
  }
  logout(){
    localStorage.removeItem('ulogovan');
    this.router.navigate(['']);
  }
  emailPattern = new RegExp("^[a-z][a-z0-9]*@[a-z]+\\.[a-z]+$")
  pred:Preduzece
  ime:string;
prezime:string;
  broj:string;
  mejl:string;
  zaIzmMag:Magacin;
  zaIzmKasa:Kasa;
  zaIzm:ZiroRacun;
  ziropattern = new RegExp("^[0-9]{3}\\-[0-9]{12}\\-[0-9]{2}$");
  
  izm(m){
    if(m.iz==false){
    
      this.zaIzmMag=m;
      this.novId=m.id;
      this.novNaz=m.naziv;
      m.iz=true;
    }else{
      
    this.predser.izmeniMag(this.pred.kor_ime,this.zaIzmMag,this.novId,this.novNaz).subscribe(res=>{
      this.ngOnInit();
      m.iz=false;
      this.zaIzmMag=null;

     })

    }

  }
  izmK(k){
    if(!k.iz){

      this.zaIzmKasa=k;
      this.novLok=k.lokacija;
      this.novTip=k.tip;
      k.iz=true;
    }else{
      this.predser.izmeniKasu(this.pred.kor_ime,this.zaIzmKasa,this.novTip,this.novLok).subscribe(res=>{
        this.ngOnInit();
        k.iz=false;
        this.zaIzmKasa=null;

      })
     
    }
   
  }
  izmZ(z){
    if(!z.iz){
      this.zaIzm=z;
      this.novBank=z.banka;
      this.novBr=z.brojR;
      z.iz=true;
    }else{
      if(!this.ziropattern.test(this.novBr)){
        alert('unesite ziro racun u odgovarajucem formatu')
        return;
      }
      this.predser.izmeniZiro(this.pred.kor_ime,this.zaIzm,this.novBank,this.novBr).subscribe(res=>{
        this.ngOnInit();
        z.iz=false;
        this.zaIzm=null;

      })
     
    }

  }
  novId:string;
  novNaz:string;
  novTip:string;
  novLok:string;
  novBank:string;
  novBr:string;
  mejlN:string;
  imeN:string;
  prezN:string;
  brojN:string;
  katN:string;
  sifre:string[]=[];
  pdvN:Boolean;
  promena:boolean=false;
  sifrarnik = [
    '123',
    '345',
    '456',
    '678'
  ];
  dodajSifru(event:any){
    
    var sifra=event.target.options;
    var opcija:any;
    for(let i=0;i<sifra.length;i++){
      opcija=sifra[i];
      if(opcija.selected){
        for(let j=0;j<this.sifre.length;j++){
          if(this.sifre[j]==this.sifrarnik[i])return;
        }
        this.sifre.push(this.sifrarnik[i])
      }
    }
   }
  promenaPod(){
    if(this.promena==false){
      this.promena=true;
    }else{
      if(!this.emailPattern.test(this.mejlN)){
        alert('unesite mejl po formatu')
        return;
      }
      this.predser.izmeniPodatke(this.pred.kor_ime,this.imeN,this.prezN,this.brojN,this.mejlN,this.pdvN,this.sifre,this.katN).subscribe(res=>{
        this.korser.dohvatiKorisnika(this.pred.kor_ime).subscribe((data:Korisnik)=>{
          localStorage.removeItem('ulogovan');
          localStorage.setItem('ulogovan',JSON.stringify(data));
          this.ngOnInit();
          this.promena=false;
          
        })
       
      })

    }

  }
  

}
