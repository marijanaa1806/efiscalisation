import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-exdialog2',
  templateUrl: './exdialog2.component.html',
  styleUrls: ['./exdialog2.component.css']
})
export class Exdialog2Component implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Exdialog2Component>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  onCancel(): void {
    this.dialogRef.close();
  }
  ids:number=0;
  sirina:number=0;
  visina:number=0;
  oblik:string=''
 
}
