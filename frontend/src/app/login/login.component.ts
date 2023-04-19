import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../model/korisnik';
import { Preduzece } from '../model/preduzece';
import { PreduzeceService } from '../preduzece.service';
import { HttpClient } from '@angular/common/http';
import { RacunService } from '../racun.service';
import { Racun } from '../model/racun';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 

  constructor(private korSer:KorisnikService,private router:Router,private predser:PreduzeceService,private http: HttpClient,private racser:RacunService) { }

  ngOnInit(): void {
    this.racser.sortirani().subscribe((data:Racun[])=>{
      this.poslednji=data;
      for(let i=0;i<5;i++){
        this.racuni.push(this.poslednji[i])

      }
    })
  }
  drzava:string;
  grad:string;
  posbr:string;
  ulica:string;
  ubroj:string;
  poslednji:Racun[]=[]
  racuni:Racun[]=[]
  kor_ime: string;
  lozinka: string;
  greska: string;

  kor_imeR: string;
  lozinkaR: string;
  lozinkaR2: string;
  adresa: string;
  pib: string;
  mat: string;
  imeR: string;
  prezimeR: string;
  mejlR: string;
  brojR:string;
  nazivR:string;
  message:string;
  pwdPattern = new RegExp("^[A-Za-z](?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{7,11}$");
  pibPattern = new RegExp("^[1-9][0-9]{8}$")
  emailPattern = new RegExp("^[a-z][a-z0-9]*@[a-z]+\\.[a-z]+$")

url: any; 
	msg = "";
	
	selectFile(event: any) { 
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
      var img = new Image();
      img.onload = (event_img: any)=>{
        if(img.width > 300 || img.width < 100 || img.height > 300 || img.height < 100)
        {
          alert("Velicina slike mora biti izmedju 100px i 300px");
          return;
        }}
			this.msg = "";
			//this.url = reader.result;
      this.url=_event.target.result; 
		}
	}


  login(){
    this.korSer.prijavaNaSistem(this.kor_ime,this.lozinka).subscribe((kor:Korisnik)=>{
      if(kor){
        localStorage.setItem('ulogovan', JSON.stringify(kor));
       if(kor.tip=='k'){
        this.router.navigate(['korisnik']);}
        else if(kor.tip=='p'){
          this.predser.getJednoPred(kor.kor_ime).subscribe((data: Preduzece)=>{
            if(data.odobreno==false){
              alert("preduzece nije odobreno")
            }else{
              if(data.prvi==false && data.ostali==false){
                this.predser.prviLog(this.kor_ime).subscribe(res=>{
                  this.router.navigate(['preduzece']);
                })
              }else  this.router.navigate(['preduzece']);
            }
            
          })
        }
      }
      else{
        this.greska = 'Greska'
      }

    })

  }
  register(){

    if(this.lozinkaR!=this.lozinkaR2){
      alert("lozinke nisu iste!!")
      return;
    }
    if(!this.pwdPattern.test(this.lozinkaR)){

      alert('neispravna lozinka')
      return;
    }
    if(!this.emailPattern.test(this.mejlR)){
      alert('neispravni mejl')
      return;
    }
    if(!this.pibPattern.test(this.pib)){
      alert('los pib')
      return;

    }
    this.adresa=this.drzava+", "+this.grad+", "+this.posbr+", "+this.ulica+" "+this.ubroj;
    this.korSer.dohvatiKorisnika(this.kor_imeR).subscribe((data:Korisnik)=>{
      if(data==null){
        this.korSer.dohvatiMejl(this.mejlR).subscribe((data1:Korisnik)=>{
          if(data1==null){
            this.predser.nadji(this.pib).subscribe((data2:Preduzece)=>{
              if(data2==null){
                this.korSer.registrujSe(this.url,this.kor_imeR,this.lozinkaR,this.adresa,this.pib,this.mat,this.imeR,this.prezimeR,this.mejlR,this.brojR,this.nazivR).subscribe(respObj=>{
                  if(respObj['message']=='ok'){
                    this.message = 'User added'
                  }
                  else{
                    this.message = 'There was a duplicate key error'
                  }
                });
              }
              else{
                alert('postoji pib');
                return;
              }
            })
          }else{
            alert('postoji mejl u sistemu')
            return;
          }
        })
      }
      else {
        alert('postoji korisnicko ime u sistemu')
        return;
      }
    })
   

    

  }
  


}
