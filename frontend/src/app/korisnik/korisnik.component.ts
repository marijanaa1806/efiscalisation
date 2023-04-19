import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artikal } from '../model/artikal';
import { NalaziSe } from '../model/nalaziSe';
import { Preduzece } from '../model/preduzece';
import { Robe } from '../model/robe';
import { PreduzeceService } from '../preduzece.service';

@Component({
  selector: 'app-korisnik',
  templateUrl: './korisnik.component.html',
  styleUrls: ['./korisnik.component.css']
})
export class KorisnikComponent implements OnInit {

  constructor(private predser:PreduzeceService,private router:Router) { }

  ngOnInit(): void {
    this.predser.getPreduzeca().subscribe((data: Preduzece[])=>{
      this.svaPreduzeca = data;
      for(let i=0;i<this.svaPreduzeca.length;i++){
        this.predser.mojeR(this.svaPreduzeca[i].kor_ime).subscribe((data:Robe[])=>{
          this.svaPreduzeca[i].mojeRobe=data;
         
        })
      }
    
    })
  }

  lokacije:Array<String>
  svaPreduzeca: Preduzece[] = []
  pretraga:string;
  pretrazi(){
    this.nadjeni=new Array<Artikal>()
    this.pr=true;
    for(let i=0;i<this.svaPreduzeca.length;i++){
      for(let j=0;j<this.svaPreduzeca[i].artikli.length;j++){
        if(this.svaPreduzeca[i].artikli[j].naziv==this.pretraga){
          
          this.svaPreduzeca[i].artikli[j].lokacije=new Array<string>()
          this.svaPreduzeca[i].artikli[j].mincene=new Array<string>();
          this.svaPreduzeca[i].artikli[j].proiz=new Array<string>();
          for(let k=0;k<this.svaPreduzeca[i].mojeRobe.length;k++){
            if(this.svaPreduzeca[i].mojeRobe[k].artikal==this.svaPreduzeca[i].artikli[j].sifra){
              this.svaPreduzeca[i].artikli[j].lokacije.push(this.svaPreduzeca[i].mojeRobe[k].nazivm);
              this.svaPreduzeca[i].artikli[j].mincene.push(this.svaPreduzeca[i].mojeRobe[k].prodajna);
              this.svaPreduzeca[i].artikli[j].proiz.push(this.svaPreduzeca[i].artikli[j].proizvodjac)
             
            }
          }
          this.svaPreduzeca[i].artikli[j].pred= this.svaPreduzeca[i].kor_ime
          this.nadjeni.push(this.svaPreduzeca[i].artikli[j])
        }
      }
    }

  }
  lokac:Array<String>;
  nadji(art,pred){

    this.lokacije=new Array<String>();
    var predz:Preduzece;
    for(let i=0;i<this.svaPreduzeca.length;i++){
      if(this.svaPreduzeca[i].kor_ime==pred)predz=this.svaPreduzeca[i];
    }
    for(let i=0;i<predz.mojeRobe.length;i++){
      if(predz.mojeRobe[i].artikal==art)this.lokacije.push(predz.mojeRobe[i].nazivm);
    }
  }
  mincena:Array<String>;
  minc(art,pred){
    this.mincena=new Array<String>();
    var predz:Preduzece;
    for(let i=0;i<this.svaPreduzeca.length;i++){
      if(this.svaPreduzeca[i].kor_ime==pred)predz=this.svaPreduzeca[i];
    }
    for(let i=0;i<predz.mojeRobe.length;i++){
      if(predz.mojeRobe[i].artikal==art)this.mincena.push(predz.mojeRobe[i].prodajna);
    }

  }
  pr:boolean;
  nadjeni:Array<Artikal>;
    logout(){
    localStorage.removeItem('ulogovan');
    this.router.navigate(['']);
  }
}
