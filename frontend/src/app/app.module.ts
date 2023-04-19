import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { KorisnikComponent } from './korisnik/korisnik.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdmlogComponent } from './admlog/admlog.component';
import { PromenaComponent } from './promena/promena.component';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PodaciComponent } from './podaci/podaci.component';
import { NaruciociComponent } from './narucioci/narucioci.component';
import { RobeComponent } from './robe/robe.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { RasArtComponent } from './ras-art/ras-art.component';
import { RasStolComponent } from './ras-stol/ras-stol.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';
import { ExdialogComponent } from './exdialog/exdialog.component';
import {
  MatButtonModule,
} from '@angular/material/button';
import {MatCommonModule} from '@angular/material/core'

import {MatInputModule} from '@angular/material/input'
import{MatFormFieldModule} from '@angular/material/form-field'

import { ExampleDialogModule } from './exdialog/exdialog.module';
import { IzdRacComponent } from './izd-rac/izd-rac.component';
import{CommonModule} from '@angular/common';
import { Exdialog2Component } from './exdialog2/exdialog2.component';
import { IzvestajComponent } from './izvestaj/izvestaj.component';
import { PregledComponent } from './pregled/pregled.component';
import { Exdialog3Component } from './exdialog3/exdialog3.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    KorisnikComponent,
    AdminComponent,
    AdmlogComponent,
    PromenaComponent,
    PreduzeceComponent,
    PodaciComponent,
    NaruciociComponent,
    RobeComponent,
    RasArtComponent,
    RasStolComponent,
    IzdRacComponent,
    Exdialog2Component,
    IzvestajComponent,
    PregledComponent,
    Exdialog3Component
    
  ],
  imports: [
  
    CommonModule,
    NgbModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatMenuModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule
   
  ],
  entryComponents:[
    ExdialogComponent,
    Exdialog2Component,
    Exdialog3Component
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
