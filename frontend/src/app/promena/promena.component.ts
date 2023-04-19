import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-promena',
  templateUrl: './promena.component.html',
  styleUrls: ['./promena.component.css']
})
export class PromenaComponent implements OnInit {

  constructor(private korSer:KorisnikService,private router:Router) { }

  ngOnInit(): void {
  }
  stara:string;
  lozinka1:string;
  lozinka2:string;
  message:string;
  pwdPattern = new RegExp("^[A-Za-z](?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{7,11}$");
  change(){
    if(!this.pwdPattern.test(this.lozinka1)){

      alert('neispravna lozinka')
      return;
    }
    if(!this.pwdPattern.test(this.lozinka2)){

      alert('neispravna lozinka')
      return;
    }
    if(this.lozinka1!=this.lozinka2){
      alert("morate dva puta uneti istu lozinku");
      return;
    }
    this.korSer.promeniLoz(this.stara,this.lozinka1).subscribe(resp=>{
      alert(resp['message'])
    });
    localStorage.getItem('ulogovan');
    this.router.navigate(['']);

    
  }

}
