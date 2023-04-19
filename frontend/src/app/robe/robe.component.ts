import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Exdialog3Component } from '../exdialog3/exdialog3.component';
import { Artikal } from '../model/artikal';
import { Magacin } from '../model/magacin';
import { Preduzece } from '../model/preduzece';
import { Robe } from '../model/robe';
import { PreduzeceService } from '../preduzece.service';
import {MatDialog} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-robe',
  templateUrl: './robe.component.html',
  styleUrls: ['./robe.component.css']
})
export class RobeComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator: MatPaginator;


  constructor(private router:Router,private predser:PreduzeceService,public dialog: MatDialog) { }

  pred:Preduzece;
  magac:Array<Magacin>;
  robe:Robe[]=[]
  artikl:Array<Artikal>;
  dataSource:MatTableDataSource<Artikal>;
  ngOnInit(): void {
    let predz=JSON.parse(localStorage.getItem('ulogovan'))
    this.predser.getJednoPred(predz.kor_ime).subscribe((data: Preduzece)=>{
      this.pred = data;
      this.num=this.pred.artikli.length;
      this.artikl=data.artikli;
      this.magac=this.pred.magacini;
      this.dataSource = new MatTableDataSource(this.artikl);
      this.dataSource.paginator=this.paginator;
      if(this.pred.kategorije=="ugostitelj"){
        this.ugostitelj=true;
      }else this.ugostitelj=false;
    
    })
    this.mojeRobe=new Array<Robe>();
    this.predser.mojeR(predz.kor_ime).subscribe((data:Robe[])=>{
      this.mojeRobe=data;
    })
  }
  displayedColumns: string[] = ['sifra', 'naziv', 'jedinica', 'stopa','proizvodjac','slika','izmena','brisanje'];
  
 

  sif:string;
  naz:string;
  jed:string;
  stop:number;
  ugostitelj:boolean;
  proiz:string;
  tip:string;

  mojeRobe:Array<Robe>;
  zp:string;
  strnaz:string;
  barkod:string;
  ct:number;
  ekot:boolean;
  akcz:boolean;
  min:number;
  max:number;
  opis:string;
  dekl:string;


  izproiz:string;
  iztip:string;
  izzp:string;
  izstrnaz:string;
  izbarkod:string;
  izct:number;
  izekot:boolean;
  izakcz:boolean;
  izmin:number;
  izmax:number;
  izopis:string;
  izdekl:string;

  //cene
  mag:string
  minc:number
  maxc:number
  sifAr:string
  nab:string
  prod:string
  stanje:number
  nazivmag:string
  zaBrisanje:Artikal;
  openDialog(ar): void {
    this.zaBrisanje=ar;
    
    let dialogRef = this.dialog.open(Exdialog3Component, {
      width: '250px',
      data:{
        message: 'Da li ste sigurni da zelite da obrisete ovaj artikal?',
        buttonText: {
          ok: 'Da',
          cancel: 'Ne'
        }
      }
    });
  
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.obrisi();
      }
    });
  }
  yes:boolean;


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
      this.url=_event.target.result; 
		}
	}

  dodaj(){
    let art = new Artikal();
    art.jedinica=this.jed;
    art.naziv=this.naz;
    if(this.pred.pdv==false){
      this.stop=0;
    }
    art.stopa=this.stop;
    art.sifra=this.sif;
    art.tip=this.tip;
    art.akcize=this.akcz;
    art.k=false;
    art.barkod=this.barkod;
    art.dekl=this.dekl;
    art.ekot=this.ekot;
    art.max=this.max;
    art.min=this.min;
    art.proizvodjac=this.proiz;
    art.zem=this.zp;
    art.strnaz=this.strnaz;
    art.opis=this.opis;
    art.car=this.ct;
    if(this.url==null){
      this.url=this.pred.difolt;
    }
    art.slika=this.url;

    this.predser.dodaj(art).subscribe(res=>{

      this.ngOnInit();
      this.showinp=false;
    }

    );
  
    this.showinp=false;


  }
  
  logout(){
    localStorage.removeItem('ulogovan');
    this.router.navigate(['']);
  }
  num:number;
  izm:boolean;
  izmjed:string;
  izmnaz:string;
  izmpro:string;
  izmsto:number;
  izmsif:string;
 
 
  iz(n){
    this.izm=true;
   
    this.izmjed=n.jedinica;
    this.izmnaz=n.naziv;
    this.izmpro=n.proizvodjac;
    this.izmsto=n.stopa;
    this.izmsif=n.sifra;
    this.izakcz=n.akcize;
    this.izbarkod=n.barkod;
    this.izct=n.car;
    this.izdekl=n.dekl;
    this.izekot=n.ekot;
    this.izopis=n.opis;
    this.izmax=n.max;
    this.izmin=n.min;
    this.izstrnaz=n.strnaz;
    this.izzp=n.zem;
    this.iztip=n.tip;
    this.zaIzmenu=new Array<Robe>();
    this.predser.mojiArtikli(this.pred.kor_ime,this.izmsif).subscribe((data:Robe[])=>{
      this.zaIzmenu=data;
      
      for(let i=0;i<this.zaIzmenu.length;i++){
        for(let j=0;j<this.mojeRobe.length;j++){
          if(this.mojeRobe[j].artikal==this.zaIzmenu[i].artikal && this.mojeRobe[j].magacin==this.zaIzmenu[i].magacin){
            this.mojeRobe[j].iz=true;
            this.idmIz=this.mojeRobe[j].magacin;
            this.nmIz=this.mojeRobe[j].nazivm;
            this.minIz=String(this.mojeRobe[j].min);
            this.maksIz=String(this.mojeRobe[j].max);
            this.malp=this.mojeRobe[j].prodajna;
            this.nabc=this.mojeRobe[j].nabavna;
            this.stnj=String(this.mojeRobe[j].stanje);
            this.sifiz=this.mojeRobe[j].artikal;
           
          }
          
        }
      }
    })

  }
  zaIzmenu:Array<Robe>;
  izmeni(){
    let n=new Artikal();
    n.jedinica=this.izmjed;
    n.naziv=this.izmnaz;
    n.proizvodjac=this.izmpro;
    n.stopa=this.izmsto;
    n.sifra=this.izmsif;
    n.akcize=this.izakcz;
    n.barkod=this.izbarkod;
    n.car=this.izct;
    n.dekl=this.izdekl;
   n.ekot=this.izekot;
    n.opis=this.izopis;
    n.max=this.izmax;
    n.min=this.izmin;
    n.strnaz=this.izstrnaz;
    n.zem=this.izzp;
    n.tip=this.iztip;
    this.predser.izmeni(n).subscribe(res=>{
      if(res['message']=='ok')this.ngOnInit();
      
    });
   
    
    this.izm=false;

  }
  showinp:boolean;
  un(){
    this.showinp=true;
  }
 
  
  idmIz:string;
  nmIz:string;
  minIz:string;
  maksIz:string;
  malp:string;
  nabc:string;
  stnj:string;
  sifiz:string;
  izmeniUmag(n){
    let im=new Robe();
    im.artikal=n.artikal;
    im.kolicina=0;
    im.iz=false;
    im.magacin=n.magacin;
    im.nazivm=n.nazivm;
    im.nabavna=this.nabc;
    im.prodajna=this.malp;
    im.min=Number(this.minIz);
    im.max=Number(this.maksIz);
    im.stanje=Number(this.stnj);
    im.preduzece=this.pred.kor_ime;
    this.predser.izmeniRobu(im.preduzece,im).subscribe(res=>{
      this.ngOnInit();
      this.izm=false;
    });


  }
  obrisimag(n){
    this.predser.obrisiRobu(n.preduzece,n.magacin,n.artikal).subscribe(res=>{
      this.ngOnInit();
      this.izm=false;
    })

  }
  nazar:string;
  unesirobu(){
    for(let i=0;i<this.artikl.length;i++){
      if(this.artikl[i].sifra==this.sifAr){

        this.nazar=this.artikl[i].naziv;
      }
    }
    this.predser.unesirobu(this.nazar,this.mag,this.nazivmag,this.maxc,this.minc,this.nab,this.prod,this.stanje,this.sifAr).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        this.ngOnInit();
        this.url=null
        this.showinp=false;
      }
      
    });
  }
  obrisi(){
    this.predser.obrisi(this.zaBrisanje).subscribe(res=>{
      this.predser.izbaciRobu(this.pred.kor_ime,this.zaBrisanje.sifra).subscribe(res=>{
        this.ngOnInit();


      })    
    }
    );
  }
  

}
