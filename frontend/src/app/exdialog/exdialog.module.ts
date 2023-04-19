import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';

import {
  MatButtonModule,
} from '@angular/material/button';
import {MatCommonModule} from '@angular/material/core'

import {MatInputModule} from '@angular/material/input'
import{MatFormFieldModule} from '@angular/material/form-field'
  
import{CommonModule} from '@angular/common'
import { ExdialogComponent } from './exdialog.component';
import { BrowserModule } from '@angular/platform-browser';

  
@NgModule({
  declarations: [ExdialogComponent],
  entryComponents: [ExdialogComponent],
  imports: [
    FormsModule,
    MatButtonModule,
    MatCommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    BrowserModule
  ],
})
export class ExampleDialogModule {}