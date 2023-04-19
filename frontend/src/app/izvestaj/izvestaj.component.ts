import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artikal } from '../model/artikal';
import { Pazar } from '../model/pazar';
import { Preduzece } from '../model/preduzece';
import { Racun } from '../model/racun';
import { PreduzeceService } from '../preduzece.service';
import { RacunService } from '../racun.service';

@Component({
  selector: 'app-izvestaj',
  templateUrl: './izvestaj.component.html',
  styleUrls: ['./izvestaj.component.css']
})
export class IzvestajComponent implements OnInit {

  constructor(private router:Router,private racunSer:RacunService,private predser:PreduzeceService) { }

  ngOnInit(): void {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    this.dan = yyyy + "-" + mm + "-" + dd
    let kk=JSON.parse(localStorage.getItem('ulogovan'))
    this.predser.getJednoPred(kk.kor_ime).subscribe((data:Preduzece)=>{
      this.pred=data;
      for(let i=0;i<this.pred.pazari.length;i++){
        if(this.pred.pazari[i].datum==this.dan){
          this.pazar=this.pred.pazari[i];
        }
      }
      this.racunSer.dnevni(kk.kor_ime).subscribe((data:Racun[])=>{
        this.racuni=data;
        this.artikli=this.pred.artikli;
      })
    })
   
   
   
  }
  logout(){
    localStorage.clear();
    this.router.navigate([''])
  }
  dan:string;
  pred:Preduzece;
  pazar:Pazar;
  racuni:Racun[]=[]
  artikli:Artikal[]=[]

}
