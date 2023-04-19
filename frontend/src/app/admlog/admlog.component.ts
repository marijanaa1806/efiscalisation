import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Korisnik } from '../model/korisnik';

@Component({
  selector: 'app-admlog',
  templateUrl: './admlog.component.html',
  styleUrls: ['./admlog.component.css']
})
export class AdmlogComponent implements OnInit {

  

  constructor(private korSer:AdminService,private router:Router) { }

  ngOnInit(): void {
  }
  kor_ime: string;
  lozinka: string;
  greska: string;
  login(){
    this.korSer.prijavaNaSistem(this.kor_ime,this.lozinka).subscribe((kor:Korisnik)=>{
      if(kor){
        localStorage.setItem('ulogovan', JSON.stringify(kor));
        if(kor.tip=='a'){
        
        this.router.navigate(['admin']);}
      }
      else{
        this.greska = 'Greska'
      }

    })

  }
}
