
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PreduzeceService } from '../preduzece.service';
import { Artikal } from '../model/artikal';
import { Preduzece } from '../model/preduzece';

@Component({
  selector: 'app-exdialog',
  templateUrl: './exdialog.component.html',
  styleUrls: ['./exdialog.component.css']
})
export class ExdialogComponent implements OnInit {
  podaci:Artikal[]=[]
  filtrirani:Artikal[]=[]


  constructor(
    public dialogRef: MatDialogRef<ExdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private predser:PreduzeceService) { 
      let predz=JSON.parse(localStorage.getItem('ulogovan'))
      this.predser.getJednoPred(predz.kor_ime).subscribe((dd: Preduzece)=>{
       
        this.podaci=dd.artikli;
     
      })

    }
    ngOnInit() {
     
    }
    
  onCancel(): void {
    this.dialogRef.close();
  }
  naziv:string;
  dod(ar){
    if(ar.k==false){
      this.predser.dodeli(ar.sifra,this.data.kat,this.data.potk).subscribe(res=>{
        this.ngOnInit();
      }

      );
    }
    else alert('artikal vec ima kategoriju');
     
  }
   
  naz:string;
  pr:boolean;
  pretraga(){
    for(let i=0;i<this.podaci.length;i++){
      if(this.podaci[i].naziv==this.naz){
        this.filtrirani.push(this.podaci[i])
      }
    }
    this.pr=true;
  }

}
