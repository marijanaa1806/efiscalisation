import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Potrosnja } from '../model/potrosnja';
import { Preduzece } from '../model/preduzece';
import { Racun } from '../model/racun';
import { PreduzeceService } from '../preduzece.service';
import { RacunService } from '../racun.service';

@Component({
  selector: 'app-pregled',
  templateUrl: './pregled.component.html',
  styleUrls: ['./pregled.component.css']
})
export class PregledComponent implements OnInit {

  constructor(private router:Router,private racSer:RacunService,private predser:PreduzeceService) { }

  ngOnInit(): void {
    this.predser.getPreduzeca().subscribe((data: Preduzece[])=>{
      this.svaPreduzeca = data;

    
    })
  }
  logout(){
  
    localStorage.clear();
    this.router.navigate([''])
  }
  svaPreduzeca:Preduzece[]=[]
  lk:string;
  mojiRac:Racun[]=[]
  prikaz:boolean;
  potrosnja:Potrosnja[]=[];
  nadji(){
    this.racSer.mojiR(this.lk).subscribe((data:Racun[])=>{
      this.mojiRac=data; 
      this.prikaz=true;

    })
    var dat=new Date();
    var yy=dat.getFullYear();
    var mm=String(dat.getMonth()+1).padStart(2,'0');
    var dan=String(dat.getDate()).padStart(2,'0');
  
   
  }
  det:boolean;
  rac:Racun;
  detalji(r){
    this.rac=r;
    this.det=true;
  }
}
