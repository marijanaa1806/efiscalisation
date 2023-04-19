
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-exdialog3',
  templateUrl: './exdialog3.component.html',
  styleUrls: ['./exdialog3.component.css']
})
export class Exdialog3Component implements OnInit {
  message: string = "Da li ste sigurni?"
  confirmButtonText = "Da"
  cancelButtonText = "Ne"

  constructor(
    public dialogRef: MatDialogRef<Exdialog3Component>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      if(data){
        this.message = data.message || this.message;
        if (data.buttonText) {
          this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
          this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
        }
          }
     

    }
    ngOnInit() {
     
    }
    
  onCancel(): void {
    this.dialogRef.close(true);
  }
  yes:boolean;
  potvrdi(){
    this.data.yes=true;
   
  }

}
