import { Component, OnInit } from '@angular/core';
import { Artikal } from '../model/artikal';

import { Preduzece } from '../model/preduzece';
import { PreduzeceService } from '../preduzece.service';
 
import { ExdialogComponent } from '../exdialog/exdialog.component';
import {MatDialog} from '@angular/material/dialog';

import {NgbModal, NgbModalConfig,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ras-art',
  templateUrl: './ras-art.component.html',
  styleUrls: ['./ras-art.component.css']

})
export class RasArtComponent implements OnInit {

  constructor(private predser:PreduzeceService,public dialog: MatDialog,private router:Router) { 
  
  }
  
  
  ngOnInit(): void {
    let predz=JSON.parse(localStorage.getItem('ulogovan'))
    this.predser.getJednoPred(predz.kor_ime).subscribe((data: Preduzece)=>{
      this.pred = data;
      this.artikl=data.artikli;
    
    
    })
  }
 
  openDialog(): void {
    let dialogRef = this.dialog.open(ExdialogComponent, {
      width: '250px',
      data: {kat:this.nazivK,potk:this.nazivpk}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }


  
  pred:Preduzece;
  artikl:Array<Artikal>;
 
  nazivK:string;
  nazivpk:string;

  dd:boolean;
  dodeli(){
    this.dd=true;

  }
  dod(ar){
    if(ar.k==false){
      this.predser.dodeli(ar.sifra,this.nazivK,this.nazivpk).subscribe(res=>{
        this.ngOnInit();
      }

      );
    }
    else alert('artikal vec ima kategoriju');
   
  
  }
  logout(){
    localStorage.removeItem('ulogovan');
    this.router.navigate(['']);
  }

}
