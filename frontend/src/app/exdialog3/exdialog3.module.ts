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
import { Exdialog3Component } from './exdialog3.component';
import { BrowserModule } from '@angular/platform-browser';

  
@NgModule({
  declarations: [Exdialog3Component],
  entryComponents: [Exdialog3Component],
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
export class ExampleDialogModule3 {}