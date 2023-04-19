import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../model/korisnik';
import { Pazar } from '../model/pazar';
import { Preduzece } from '../model/preduzece';
import { PreduzeceService } from '../preduzece.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router:Router,private korser:KorisnikService,private predser:PreduzeceService) { }

  ngOnInit(): void {
    this.predser.getPreduzeca().subscribe((data: Preduzece[])=>{
      this.svaPreduzeca = data;
      for(let i=0;i<this.svaPreduzeca.length;i++){
        for(let j=0;j<this.svaPreduzeca[i].pazari.length;j++){
            this.svaPreduzeca[i].pazari[j].pred=this.svaPreduzeca[i].naziv;
            this.svip.push(this.svaPreduzeca[i].pazari[j]); 
        }
      }
    
    })
  }

  svaPreduzeca: Preduzece[] = []
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

  kor_imeR1: string;
  lozinkaR1: string;
  lozinkaR21: string;
  imeR1: string;
  prezimeR1: string;
  mejlR1: string;
  brojR1:string;
  brLk:string;
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
      this.url=_event.target.result; 
		}
	}
  drzava:string;
  grad:string;
  posbr:string;
  ulica:string;
  ubroj:string;
  registruj(){
    if(!this.pwdPattern.test(this.lozinkaR)){

      alert('neispravna lozinka')
      return;
    }
    if(this.lozinkaR!=this.lozinkaR2){
      alert("lozinke nisu iste!!")
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
    this.korser.dohvatiKorisnika(this.kor_imeR).subscribe((data:Korisnik)=>{
      if(data==null){
        this.korser.dohvatiMejl(this.mejlR).subscribe((data1:Korisnik)=>{
          if(data1==null){
            this.predser.nadji(this.pib).subscribe((data2:Preduzece)=>{
              if(data2==null){
                this.korser.registrujSe(this.url,this.kor_imeR,this.lozinkaR,this.adresa,this.pib,this.mat,this.imeR,this.prezimeR,this.mejlR,this.brojR,this.nazivR).subscribe(respObj=>{
                  if(respObj['message']=='ok'){
                    this.message = 'User added'
                    this.kor_imeR="";
                    this.lozinkaR="";
                    this.lozinkaR2="";
                    this.adresa="";
                    this.grad="";
                    this.drzava="";
                    this.ulica="";
                    this.ubroj=""
                    this.posbr=""
                    this.pib="";
                    this.mat="";
                    this.imeR="";
                    this.prezimeR="";
                    this.mejlR="";
                    this.brojR="";
                    this.nazivR="";
                    this.ngOnInit();
                  }
                  else{
                    this.message = 'neuspela reg'
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
  unos(){
    if(this.lozinkaR1!=this.lozinkaR21){
      alert("lozinke nisu iste!!")
      return;
    }
    if(!this.pwdPattern.test(this.lozinkaR1)){

      alert('neispravna lozinka')
      return;
    }
    this.korser.dohvatiKorisnika(this.kor_imeR1).subscribe((data:Korisnik)=>{
      if(data==null){
        
            this.korser.dohvatiLk(this.brLk).subscribe((data2:Korisnik)=>{
              if(data2==null){
                this.korser.unesi(this.kor_imeR1,this.lozinkaR1,this.imeR1,this.prezimeR1,this.brojR1,this.brLk).subscribe(respObj=>{
                  if(respObj['message']=='ok'){
                    this.kor_imeR1="";
                    this.lozinkaR1="";
                    this.lozinkaR21="";  
                    this.imeR1="";
                    this.prezimeR1="";  
                    this.brojR1="";
                  }
                  
                });
              }
              else{
                alert('postoji lk');
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
  prihvati(pib){
    this.predser.prihvati(pib).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        alert('prihvacena');
      }
      this.ngOnInit();
    });
  }
  aktiviraj(pib){
    this.predser.aktiviraj(pib).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        alert('aktiviran');
      }
      this.ngOnInit();
    });

  }
  deaktiviraj(pib){
    this.predser.deaktiviraj(pib).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        alert('deaktiviran');
      }
      this.ngOnInit();
    });

  }
  odbij(pib){
    this.predser.odbij(pib).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        alert('odbijena');
      }
      this.ngOnInit();
    });

  }
  nazP:string;
  pibP:string;
  datumOd:string;
  datumDo:string; 
  pr:boolean;
  Pazari:Pazar[]=[]
  svip:Pazar[]=[]
  pregledaj(){
    if(this.datumDo==null){
      alert('datum do je obavezan')
      return;
    }
    if(this.datumOd==null){
      alert('datum od je obavezan')
      return;
    }
    for(let i=0;i<this.svaPreduzeca.length;i++){
      for(let j=0;j<this.svaPreduzeca[i].pazari.length;j++){
      
        if(this.svaPreduzeca[i].pazari[j].datum>=this.datumOd &&this.svaPreduzeca[i].pazari[j].datum<=this.datumDo){
          this.svaPreduzeca[i].pazari[j].pred=this.svaPreduzeca[i].naziv;
          this.Pazari.push(this.svaPreduzeca[i].pazari[j]);
        }
      }
    }
    this.pr=true;
  }

}
