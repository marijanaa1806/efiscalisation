import { Component, NgProbeToken, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../model/korisnik';
import { Narucilac } from '../model/narucilac';
import { Preduzece } from '../model/preduzece';
import { PreduzeceService } from '../preduzece.service';

@Component({
  selector: 'app-narucioci',
  templateUrl: './narucioci.component.html',
  styleUrls: ['./narucioci.component.css']
})
export class NaruciociComponent implements OnInit {

  constructor(private router:Router,private korSer:KorisnikService,private predser:PreduzeceService) { }

  ngOnInit(): void {
  }
  logout(){
    localStorage.removeItem('ulogovan');
    this.router.navigate(['']);
  }
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

  searchparam:string;
  pretraga:Preduzece;
  brojd:number;
  rab:number;
  pibunos:string;
  pwdPattern = new RegExp("^[A-Za-z](?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{7,11}$");
  pibPattern = new RegExp("^[1-9][0-9]{8}$")
  emailPattern = new RegExp("^[a-z][a-z0-9]*@[a-z]+\\.[a-z]+$")
  search(){
    this.predser.nadji(this.searchparam).subscribe((pr: Preduzece)=>{
      this.pretraga = pr
     this.pibunos=pr.PIB
    })
  }
 
  unos(){
    let nr=new Narucilac();
    nr.brojDana=this.brojd;
    nr.rabat=this.rab;
    this.predser.ubaciNar(this.pibunos,nr).subscribe()
  }
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
      this.url=_event.target.result; 
		}
	}
  drzava:string;
  grad:string;
  posbr:string;
  ulica:string;
  ubroj:string;
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
                this.korSer.regisPred(this.url,this.kor_imeR,this.lozinkaR,this.adresa,this.pib,this.mat,this.imeR,this.prezimeR,this.mejlR,this.brojR,this.nazivR).subscribe(respObj=>{
                  if(respObj['message']=='ok'){

                    let nr=new Narucilac();
                  
                    this.predser.nadji(this.pib).subscribe((pr: Preduzece)=>{
                     
                      nr.preduzece=pr;
                      nr.brojDana=this.brojd;
                      nr.rabat=this.rab;
                      this.predser.ubaciNar1(nr).subscribe();
                    })
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
