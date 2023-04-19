import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdmlogComponent } from './admlog/admlog.component';
import { IzdRacComponent } from './izd-rac/izd-rac.component';
import { IzvestajComponent } from './izvestaj/izvestaj.component';
import { KorisnikComponent } from './korisnik/korisnik.component';
import { LoginComponent } from './login/login.component';
import { Preduzece } from './model/preduzece';
import { NaruciociComponent } from './narucioci/narucioci.component';
import { PodaciComponent } from './podaci/podaci.component';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { PregledComponent } from './pregled/pregled.component';
import { PromenaComponent } from './promena/promena.component';
import { RasArtComponent } from './ras-art/ras-art.component';
import { RasStolComponent } from './ras-stol/ras-stol.component';
import { RobeComponent } from './robe/robe.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'korisnik', component: KorisnikComponent},
  {path: 'admlog', component: AdmlogComponent},
  {path: 'promeni', component: PromenaComponent},
  {path: 'preduzece', component: PreduzeceComponent},
  {path:'narucioci',component:NaruciociComponent},
  {path:'robe',component:RobeComponent},
  {path:'podaci',component:PodaciComponent},
  {path:'rasArt',component:RasArtComponent},
  {path:'rasStol',component:RasStolComponent},
  {path:'izdRac',component:IzdRacComponent},
  {path:'izvestaj',component:IzvestajComponent},
  {path:'pregled',component:PregledComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
