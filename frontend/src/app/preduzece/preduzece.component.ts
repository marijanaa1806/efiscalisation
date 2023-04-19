import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, Form } from '@angular/forms';
import { PreduzeceService } from '../preduzece.service';
import { Magacin } from '../model/magacin';
import { Kasa } from '../model/kasa';
import { ZiroRacun } from '../model/ziror';
import { Preduzece } from '../model/preduzece';
import { makeStateKey } from '@angular/platform-browser';
import { __values } from 'tslib';



@Component({
  selector: 'app-preduzece',
  templateUrl: './preduzece.component.html',
  styleUrls: ['./preduzece.component.css']
})
export class PreduzeceComponent implements OnInit {

  dynamicForm:any = FormGroup;
  dynamicForm2:any = FormGroup;
  dynamicForm3:any = FormGroup;
  dynamicForm4:any = FormGroup;

  
  constructor(private fb: FormBuilder,private router:Router,private predSer:PreduzeceService){ 

    this.dynamicForm2 = this.fb.group({
      properties2: this.fb.array([])
    });
    this.dynamicForm = this.fb.group({
      properties: this.fb.array([])
    });
    this.dynamicForm3 = this.fb.group({
      properties3: this.fb.array([])
    });
    this.dynamicForm4 = this.fb.group({
      properties4: this.fb.array([])
    });
    
   }

   banka:string;
   brojrac:string;
    ziropattern = new RegExp("^[0-9]{3}\\-[0-9]{12}\\-[0-9]{2}$");
   dodajJosJedan(){
    if(!this.ziropattern.test(this.brojrac)){
      alert('neispravan format ziro racuna, unesite racun u formatu [3 cifre]-[12 cifara]-[2 cifre]');
      return;
      
    }
   let z=new ZiroRacun();
   z.banka=this.banka;
   z.brojR=this.brojrac;
   this.ziro.push(z);
   this.banka="";
   this.brojrac="";

   

   }
   dodajSifru(event:any){
    var sifrasel=event.target.options;
    var opcija:any;
    for(let i=0;i<sifrasel.length;i++){
      opcija=sifrasel[i];
      if(opcija.selected){
   
        this.sifre.push(this.sifrarnik[i])
      }
    }
   }
  addProperty() {
    this.number1=this.number1-1;
    for(var i=1; i<=this.number1; i++) {
      <FormArray>this.dynamicForm.get('properties').push(new FormControl());
    }
    for(var i=1; i<=this.number1; i++) {
      <FormArray>this.dynamicForm3.get('properties3').push(new FormControl());
    }
  }
  addProperty2() {
    this.number2=this.number2-1;
    for(var i=1; i<=this.number2; i++) {
      <FormArray>this.dynamicForm2.get('properties2').push(new FormControl());
      
    }
    for(var i=1; i<=this.number2; i++) {
      <FormArray>this.dynamicForm4.get('properties4').push(new FormControl());
    }
  }
 
  
  podaci(){

    this.router.navigate(['/podaci']);
  }
  nar(){

    this.router.navigate(['/narucioci']);
  }
  rob(){

    this.router.navigate(['/robe']);
  }
  ra(){

    this.router.navigate(['/rasArt']);
  }
  rs(){
    this.router.navigate(['/rasStol']);

  }
  ir(){
    let iz='izdavanjeRacuna'
    localStorage.setItem('izdavanje',JSON.stringify(iz))
    this.router.navigate(['/rasStol'])
  }
  izv(){
    this.router.navigate(['/izvestaj'])
  }
  preduzece:Preduzece;
  id1:string;
  naz1:string;
  lok1:string;
  tip1:string;
  sifrarnik = [
    '123',
    '345',
    '456',
    '678'
  ];
  
  sifre:string[]=[];
  ngOnInit(): void {
    let predz=JSON.parse(localStorage.getItem('ulogovan'))
    this.predSer.getJednoPred(predz.kor_ime).subscribe((data: Preduzece)=>{
      this.preduzece = data;
    
    })
  }
  vred:string;
  prop(): FormArray{
    return this.dynamicForm.get('properties') as FormArray;
  }
  prop2(): FormArray{
    return this.dynamicForm2.get('properties2') as FormArray;
  }
  prop3(): FormArray{
    return this.dynamicForm3.get('properties3') as FormArray;
  }
  prop4(): FormArray{
    return this.dynamicForm4.get('properties4') as FormArray;
  }
  pokupiM(){
    
    let mag1=new Magacin();
    mag1.id=this.id1;
    mag1.naziv=this.naz1;
    this.mags.push(mag1);
    for(let i=0;i<this.prop().length;i++){
      for(let j=0;j<this.prop().length;j++){
        if(j!=i){
          if(this.prop().at(i).value==this.prop().at(j).value || this.prop3().at(i).value==this.prop3().at(j).value){
            alert('vec postoji magacin sa imenom '+this.prop3().at(i).value+" i id "+this.prop().at(i).value);
            return;
          }
        }
      
      }
      if(this.prop().at(i).value==mag1.id || this.prop3().at(i).value==mag1.naziv){
        alert('vec postoji magacin sa imenom '+this.prop3().at(i).value+" i id "+this.prop().at(i).value);
        return;

      }
      let mag=new Magacin();
      mag.id=this.prop().at(i).value;
      mag.naziv=this.prop3().at(i).value;
      this.mags.push(mag);
    }

  } 
  kase2=[
    'mala',
    'velika',
    'srednja'
  ]

  pokupiK(){
    let ks1=new Kasa();
    ks1.lokacija=this.lok1;
    ks1.tip=this.tip1;
    this.kase.push(ks1);
    for(let i=0;i<this.prop2().length;i++){
      let ks=new Kasa();
      ks.lokacija=this.prop2().at(i).value;
      ks.tip=this.prop4().at(i).value;
      this.kase.push(ks);
    }
    
   
  }
  logout(){
    localStorage.removeItem('ulogovan');
    this.router.navigate(['']);
  }
  kat:string;
  sif:string;
  jeste:boolean;
  number1:number;
  number2:number;
  items:number[];
  isLess:boolean=true;
  counter:number;
  ids:Array<number>= new Array<number>();
  mags:Array<Magacin>=new Array<Magacin>();
  kase:Array<Kasa>=new Array<Kasa>();
  ziro:Array<ZiroRacun>=new Array<ZiroRacun>();

 
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
        if(img.width > 100 || img.width < 50 || img.height > 100 || img.height < 50)
        {
          alert("Velicina slike mora biti izmedju 50px i 100px");
          return;
        }}
			this.msg = "";
			//this.url = reader.result;
      this.url=_event.target.result; 
		}
	}

  updatePred(){


   this.predSer.updatepod(this.url,this.kat,this.jeste,this.sifre,this.mags,this.kase,this.ziro).subscribe();
   this.predSer.ostaliLog(this.preduzece.kor_ime).subscribe(res=>{
    this.ngOnInit();
   })
  }

}
