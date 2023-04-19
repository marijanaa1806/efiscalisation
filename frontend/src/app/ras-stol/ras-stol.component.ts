import { ArrayType } from '@angular/compiler';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exdialog2Component } from '../exdialog2/exdialog2.component';

import { Objekat } from '../model/objekat';
import { Preduzece } from '../model/preduzece';
import { Sto } from '../model/sto';
import { PreduzeceService } from '../preduzece.service';
import {MatDialog} from '@angular/material/dialog';
import { RacunService } from '../racun.service';


@Component({
  selector: 'app-ras-stol',
  templateUrl: './ras-stol.component.html',
  styleUrls: ['./ras-stol.component.css']
})
export class RasStolComponent implements AfterViewInit {

  @ViewChild('canvasEl') canvasEl: ElementRef;

  private context: CanvasRenderingContext2D;

  constructor(private predser:PreduzeceService,private router:Router,public dialog: MatDialog,private racser:RacunService) {}

  ngAfterViewInit() {
    this.context = (
      this.canvasEl.nativeElement as HTMLCanvasElement
    ).getContext('2d');
    let predz=JSON.parse(localStorage.getItem('ulogovan'))
    this.predser.getJednoPred(predz.kor_ime).subscribe((data: Preduzece)=>{
      this.preduzece = data;
      this.predser.getObjekte(data.kor_ime).subscribe((data1:Objekat[])=>{
        this.objekti=data1;
      })
     
      
    })

    this.pomeranje=false;
    this.ob1.stolovi=this.stolovi;
    this.odlj=false;
    this.unosstola=false;
    
  }

  openDialog(): void {
    
    let dialogRef = this.dialog.open(Exdialog2Component, {
      width: '250px',
      data: {ids:this.ids,sirina:this.sirina,visina:this.visina,oblik:this.oblik

      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.inp=true;
        this.ids=result.ids;
        this.sirina=result.sirina;
        this.visina=result.visina;
        this.oblik=result.oblik;
        
        
      }
      
    });
  }
  logout(){
    localStorage.removeItem('ulogovan');
    this.router.navigate(['']);
  }
  objekti:Array<Objekat>=new Array<Objekat>();
  ob1:Objekat=new Objekat();
  stolovi:Array<Sto>=new Array<Sto>();
 odlj:boolean;
  nazivod:string;
  unosstola:boolean;
  //dohvatamo stolove iz baze
  dohvaceniS:Array<Sto>=new Array<Sto>();
  izberiod(od){
    this.context.clearRect(0,0,(this.canvasEl.nativeElement as HTMLCanvasElement).width,(this.canvasEl.nativeElement as HTMLCanvasElement).height)
    this.ob1=od;
    this.dohvaceniS=this.ob1.stolovi;
    this.context.font = '15px Arial';
    this.context.textBaseline = 'middle';
    this.context.textAlign = 'center';
    this.context.fillStyle = "#ff6";
    for(let i=0;i<this.dohvaceniS.length;i++){
      if(this.dohvaceniS[i].oblik=="krug"){
        this.context.beginPath();
        this.context.ellipse(this.dohvaceniS[i].xkoor, this.dohvaceniS[i].ykoor, this.dohvaceniS[i].sirina, this.dohvaceniS[i].visina, Math.PI/4 , 0, 2 * Math.PI)
        this.context.fill();
        if(this.dohvaceniS[i].zauzet){
          this.context.strokeText("zauzet",this.dohvaceniS[i].xkoor,this.dohvaceniS[i].ykoor)

        }else{
          this.context.strokeText(this.dohvaceniS[i].ids.toString(),this.dohvaceniS[i].xkoor, this.dohvaceniS[i].ykoor)


        }
        this.context.closePath();

      }else{

        this.context.beginPath();
        this.context.fillRect(this.dohvaceniS[i].xkoor,this.dohvaceniS[i].ykoor,this.dohvaceniS[i].sirina,this.dohvaceniS[i].visina);
        this.context.fill();
        var  xx=this.dohvaceniS[i].sirina/2
        var yy=this.dohvaceniS[i].visina/2
        if(this.dohvaceniS[i].zauzet){
          this.context.strokeText("zauzet",this.dohvaceniS[i].xkoor+xx,this.dohvaceniS[i].ykoor+yy)

        }else{
          this.context.strokeText(this.dohvaceniS[i].ids.toString(),this.dohvaceniS[i].xkoor+xx,this.dohvaceniS[i].ykoor+yy)

        }
        this.context.closePath();
      }
    }
  }
  odelj(){
    this.odlj=true;
  
  }

  unesiod(){
    let od=new Objekat();
    od.naziv=this.nazivod;
    od.stolovi=new Array<Sto>();
    od.preduzece=this.preduzece.kor_ime;
    this.predser.unesiOb(od).subscribe();
    this.odlj=false;
    this.ngAfterViewInit();

  }
  x1:number;
  x2:number;
  y1:number;
  y2:number;
  pomeranje:boolean;
 
  xu:number;
  yu:number;
  stoX:number;
  stoY:number;
  stoS:number;
  stoV:number;
  stoId:number;
  tip:string;
  nadjiSto(x1,y1){
    for(let i=0;i<this.dohvaceniS.length;i++){
      if(this.dohvaceniS[i].oblik=='krug'){
        this.m=this.dohvaceniS[i].xkoor+this.dohvaceniS[i].sirina;
        this.n=this.dohvaceniS[i].xkoor-this.dohvaceniS[i].sirina;
        this.p=this.dohvaceniS[i].ykoor+this.dohvaceniS[i].visina;
        this.q=this.dohvaceniS[i].ykoor-this.dohvaceniS[i].visina;
       
        if(this.y1>=this.q && this.y1<=this.p && this.x1>=this.n && this.x1<=this.m){
          this.stoX=this.dohvaceniS[i].xkoor;
          this.stoY=this.dohvaceniS[i].ykoor;
          this.stoS=this.dohvaceniS[i].sirina;
          this.stoV=this.dohvaceniS[i].visina;
          this.stoId=this.dohvaceniS[i].ids;
         this.tip=this.dohvaceniS[i].oblik;
        }
      }
      else{
        this.m=this.dohvaceniS[i].xkoor+this.dohvaceniS[i].sirina;
        this.n=this.dohvaceniS[i].xkoor;
       this.p=this.dohvaceniS[i].ykoor+this.dohvaceniS[i].visina;
        this.q=this.dohvaceniS[i].ykoor;
        if(this.y1>=this.q && this.y1<=this.p && this.x1>=this.n && this.x1<=this.m){
          this.stoX=this.dohvaceniS[i].xkoor;
          this.stoY=this.dohvaceniS[i].ykoor;
          this.stoS=this.dohvaceniS[i].sirina;
          this.stoV=this.dohvaceniS[i].visina;
          this.stoId=this.dohvaceniS[i].ids;
          this.tip=this.dohvaceniS[i].oblik;
         
        }
      }
    }

  }
  getPosition(event){
  
    let xk=event.offsetX;
    let yk=event.offsetY;
    if(this.pomeranje){
      this.x2=xk;
      this.y2=yk;
      this.nadjiSto(this.x1,this.y1);
      this.check()

    }else{
      if(this.inp==true){

        this.xu=xk;
        this.yu=yk;
        this.novisto();

      }
      this.x1=xk;
      this.y1=yk;
      
    }
   
    let it= JSON.parse(localStorage.getItem('izdavanje'))
    if(it=='izdavanjeRacuna'){
      localStorage.removeItem('izdavanje');
      
      for(let i=0;i<this.dohvaceniS.length;i++){
        if(this.dohvaceniS[i].oblik=='krug'){
          this.m=this.dohvaceniS[i].xkoor+this.dohvaceniS[i].sirina;
          this.n=this.dohvaceniS[i].xkoor-this.dohvaceniS[i].sirina;
          this.p=this.dohvaceniS[i].ykoor+this.dohvaceniS[i].visina;
          this.q=this.dohvaceniS[i].ykoor-this.dohvaceniS[i].visina;
         
          if(yk>=this.q && yk<=this.p && xk>=this.n && xk<=this.m){
            localStorage.setItem('sto',JSON.stringify(this.dohvaceniS[i]));
            localStorage.setItem('objekat',JSON.stringify(this.ob1))
            this.router.navigate(['/izdRac'])
          }
        }
        else{
          this.m=this.dohvaceniS[i].xkoor+this.dohvaceniS[i].sirina;
          this.n=this.dohvaceniS[i].xkoor;
         this.p=this.dohvaceniS[i].ykoor+this.dohvaceniS[i].visina;
          this.q=this.dohvaceniS[i].ykoor;
          if(yk>=this.q && yk<=this.p && xk>=this.n && xk<=this.m){
            localStorage.setItem('sto',JSON.stringify(this.dohvaceniS[i]));
            localStorage.setItem('objekat',JSON.stringify(this.ob1))
            this.router.navigate(['/izdRac'])
          }
        }
      }

    }
}
  inp:boolean;
  sirina:number;
  visina:number;
  ids:number;
  oblik:string;
  m:number;
  n:number;
  p:number;
  q:number;
  preduzece:Preduzece
 check(){
    for(let i=0;i<this.dohvaceniS.length;i++){
      if(this.dohvaceniS[i].oblik=='krug'){
        this.m=this.dohvaceniS[i].xkoor+this.dohvaceniS[i].sirina;
        this.n=this.dohvaceniS[i].xkoor-this.dohvaceniS[i].sirina;
        this.p=this.dohvaceniS[i].ykoor+this.dohvaceniS[i].visina;
        this.q=this.dohvaceniS[i].ykoor-this.dohvaceniS[i].visina;
        
        if(this.y2>=this.q && this.y2<=this.p && this.x2>=this.n && this.x2<=this.m){
          alert('postoji sto vec na toj poziciji')
          this.pomeranje=false;
  this.x1=0;
  this.x2=0;
  this.y1=0;
  this.y2=0;
          return;
        }
      }else{
         this.m=this.dohvaceniS[i].xkoor+this.dohvaceniS[i].sirina;
        this.n=this.dohvaceniS[i].xkoor;
       this.p=this.dohvaceniS[i].ykoor+this.dohvaceniS[i].visina;
        this.q=this.dohvaceniS[i].ykoor;
        if(this.y2>=this.q && this.y2<=this.p && this.x2>=this.n && this.x2<=this.m){
          alert('postoji sto vec na toj poziciji')
          this.pomeranje=false;
  this.x1=0;
  this.x2=0;
  this.y1=0;
  this.y2=0;
          return;
        }

      }
    }
    if(this.tip=="krug"){
      this.context.clearRect(this.stoX-this.stoS,this.stoY-this.stoV,2*this.stoS,2*this.stoV);
      this.context.beginPath();
      this.context.fillStyle = "#ff6";
      this.stoX=this.x2;
      this.stoY=this.y2;
      this.context.ellipse(this.stoX, this.stoY, this.stoS, this.stoV, Math.PI/4 , 0, 2 * Math.PI)
  this.context.fill();
  this.context.strokeText(this.stoId.toString(),this.stoX, this.stoY)
  this.context.closePath();
  let st=new Sto();
  st.xkoor=this.stoX;
  st.ykoor=this.stoY;
  st.ids=this.stoId;
  st.visina=this.stoV;
  st.sirina=this.stoS;
  st.oblik=this.tip;
  st.zauzet=false;
  this.racser.izmeniSto(this.ob1.naziv,st,this.preduzece.kor_ime).subscribe(res=>{
    if(res['message']=='ok')this.ngAfterViewInit();
  });
  this.pomeranje=false;
  this.x1=0;
  this.x2=0;
  this.y1=0;
  this.y2=0;


    }else{

      this.context.clearRect(this.stoX,this.stoY,this.stoS,this.stoV);
      this.context.beginPath();
      this.context.fillStyle = "#ff6";
      this.stoX=this.x2;
      this.stoY=this.y2;
      var  xx=this.stoS/2
        var yy=this.stoV/2
      this.context.fillRect(this.stoX, this.stoY, this.stoS, this.stoV)
      this.context.strokeText(this.stoId.toString(),this.stoX+xx,this.stoY+yy)
      this.context.closePath();
      let st=new Sto();
  st.xkoor=this.stoX;
  st.ykoor=this.stoY;
  st.ids=this.stoId;
  st.visina=this.stoV;
  st.sirina=this.stoS;
  st.oblik=this.tip;
  st.zauzet=false;
  this.racser.izmeniSto(this.ob1.naziv,st,this.preduzece.kor_ime).subscribe(res=>{
    if(res['message']=='ok')this.ngAfterViewInit();
  });
      this.pomeranje=false;
      this.x1=0;
      this.x2=0;
      this.y1=0;
      this.y2=0;
     
    }
  }


  
  pomeri(){
    this.pomeranje=true;
  }
  
  novisto(){
    
    this.draw();
    if(this.oblik=="pravougaonik"){
      let st=new Sto();
      st.ids=this.ids;
      st.oblik="pravougaonik";
      st.sirina=this.sirina;
      st.visina=this.visina;
      st.xkoor=this.xu;
      st.ykoor=this.yu;
      st.zauzet=false;
      this.stolovi.push(st);
      this.predser.ubaciSto(this.ob1.naziv,st).subscribe();
      
    }
    else{
      let st=new Sto();
      st.ids=this.ids;
      st.oblik="krug";
      st.sirina=this.sirina;
      st.visina=this.visina;
      st.xkoor=this.xu;
      st.ykoor=this.yu;
      st.zauzet=false;
      this.stolovi.push(st);
      this.predser.ubaciSto(this.ob1.naziv,st).subscribe();
      
    }
  }
  dodaj(){
    this.inp=true;
  }
   draw() {
    this.context.font = '15px Arial';
    this.context.textBaseline = 'middle';
    this.context.textAlign = 'center';
    this.inp=false;

    const x = (this.canvasEl.nativeElement as HTMLCanvasElement).width / 2;
    const y = (this.canvasEl.nativeElement as HTMLCanvasElement).height / 2;
   
    this.context.fillStyle = "#ff6";
    if(this.oblik=='krug'){
      //x,y koordinate centra i  sirina i visina elipse, tekst treba da se ispisuje u centru
      this.context.beginPath();
      this.context.ellipse(this.xu, this.yu, this.sirina, this.visina, Math.PI/4 , 0, 2 * Math.PI)
      this.context.fill();
      this.context.strokeText(this.ids.toString(),this.xu, this.yu)
      this.context.closePath();
    
    }else{

      //x,y koordinate gornjeg levog ugla,sirina ka desno i visina ka dole
      //tekst od x,y + pola sirine i polavisine 
      this.context.beginPath();
      this.context.fillRect(this.xu,this.yu,this.sirina,this.visina);
      this.context.strokeText(this.ids.toString(),this.xu+this.sirina/2,this.yu+this.visina/2)
      this.context.closePath();

    }
  
    
  }

}
