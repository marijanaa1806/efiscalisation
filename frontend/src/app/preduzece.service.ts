import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Objekat } from './model/objekat';


@Injectable({
  providedIn: 'root'
})
export class PreduzeceService {
  
  unesiOb(ob){
    const podaci={
      ob:ob
    }
    return this.http.post(`${this.uri}/objekti/unesiOb`, podaci);
  }
  getObjekte(kor){
    const podaci={
      kor:kor
    }
    return this.http.post(`${this.uri}/objekti/getObjekte`, podaci);

  }
  ubaciSto(obj,sto){
    let korisnik=JSON.parse(localStorage.getItem('ulogovan'));
    const podaci={
     obj:obj,
     sto:sto,
     pred:korisnik.kor_ime
    }
    return this.http.post(`${this.uri}/objekti/ubaciSto`, podaci);

  }
  unesirobu(nazar,mag, nazivmag, maxc, minc, nab, prod, stanje, sifAr) {
    let korisnik=JSON.parse(localStorage.getItem('ulogovan'));
    const podaci={
      mag:mag,
      nazivmag:nazivmag,
      maxc:maxc,
      minc:minc,
      nab:nab,
      prod:prod,
      stanje:stanje,
      sifAr:sifAr,
      pred:korisnik.kor_ime,
      nazar:nazar

    }
    return this.http.post(`${this.uri}/robe/unesirobu`, podaci);
  }
  izbaciRobu(kime,sifra){
    const podaci={
      kime:kime,
      sifra:sifra,
      
    }
    return this.http.post(`${this.uri}/robe/izbaciRobu`, podaci);
  }
  izmeniRobu(kor,n){
    const podaci={
      kor:kor,
     roba:n
      
    }
    return this.http.post(`${this.uri}/robe/izmeniRobu`, podaci);

  }
  prviLog(kor){
    const podaci={
      kor:kor
    }
    return this.http.post(`${this.uri}/preduzece/prviLog`, podaci);
  }
  ostaliLog(kor){
    const podaci={
      kor:kor
    }
    return this.http.post(`${this.uri}/preduzece/ostaliLog`, podaci);
  }
  obrisiRobu(kor,mag,sif){
    const podaci={
      kor:kor,
      sifra:sif,
      mag:mag
      
    }
    return this.http.post(`${this.uri}/robe/obrisiRobu`, podaci);

  }
  mojiArtikli(kime,sifra){
    const podaci={
      kime:kime,
      sifra:sifra
    }
    return this.http.post(`${this.uri}/robe/mojiArtikli`, podaci);
  }
  dodaj(art) {
    let korisnik=JSON.parse(localStorage.getItem('ulogovan'));
    const podaci={

      kor:korisnik.kor_ime,
      n:art
    }
    return this.http.post(`${this.uri}/preduzece/dodaj`, podaci);
  }
  
  izmeni(n) {
    let korisnik=JSON.parse(localStorage.getItem('ulogovan'));
    const podaci={

      kor:korisnik.kor_ime,
      n:n
    }
    return this.http.post(`${this.uri}/preduzece/izmeni`, podaci);
  }
  obrisi(n) {
    let korisnik=JSON.parse(localStorage.getItem('ulogovan'));
    const podaci={

      kor:korisnik.kor_ime,
      n:n
    }
    return this.http.post(`${this.uri}/preduzece/obrisi`, podaci);
   
  }
  ubaciNar(pib,nr) {
    let korisnik=JSON.parse(localStorage.getItem('ulogovan'));
    const podaci={

      pib:pib,
      k_ime:korisnik.kor_ime,
      nr:nr
    }
    return this.http.post(`${this.uri}/preduzece/ubaciNar`, podaci);
  }
  ubaciNar1(nr) {
    let korisnik=JSON.parse(localStorage.getItem('ulogovan'));
    const podaci={

      k_ime:korisnik.kor_ime,
      nr:nr
    }
    return this.http.post(`${this.uri}/preduzece/ubaciNar1`, podaci);
  }
  nadji(searchparam) {
    return this.http.get(`${this.uri}/preduzece/nadji?param=${searchparam}`)
    
  }

  
 
  updatepod(url,kat, jeste, sifre, mags, kase, ziro) {
    let kor=JSON.parse(localStorage.getItem('ulogovan'));
    const podaci={
      kat:kat,
      jeste:jeste,
      sifre:sifre,
      mags:mags,
      kase:kase,
      ziro:ziro,
      kors:kor.kor_ime,
      url:url

    }
    return this.http.post(`${this.uri}/preduzece/updatepod`, podaci);
  }

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000'

  getPreduzeca(){
    return this.http.get(`${this.uri}/preduzece/svaPreduzeca`)
  }
  getRobe(){
    return this.http.get(`${this.uri}/robe/sveRobe`)
  }
  getJednoPred(korim){
    const podaci={

      kor_ime:korim
    }
    return this.http.post(`${this.uri}/preduzece/getJednoPred`, podaci)
  }
  mojeR(korim){
    const podaci={

      kime:korim
    }
    return this.http.post(`${this.uri}/robe/mojeR`, podaci)
  }
  izmeniMag(kor,stari,novid,novnz){
    const podaci={
      kor:kor,
      stari:stari,
      idd:novid,
      nazi:novnz
    }
    return this.http.post(`${this.uri}/preduzece/izmeniMag`, podaci);

  }
  izmeniKasu(kor,stari,novtip,novlok){
    const podaci={
      kor:kor,
      stari:stari,
      tip:novtip,
      lok:novlok
    }
    return this.http.post(`${this.uri}/preduzece/izmeniKasu`, podaci);

  }
  izmeniPodatke(kor,ime,prez,br,mejl,pdv,sifre,kat){
    const podaci={
      kor:kor,
      ime:ime,
      prez:prez,
      br:br,
      mejl:mejl,
      pdv:pdv,
      sifre:sifre,
      kat:kat

    }
    return this.http.post(`${this.uri}/preduzece/izmeniPodatke`, podaci);
  }
  izmeniZiro(kor,stari,novbank,novbr){
    const podaci={
      kor:kor,
      stari:stari,
      banka:novbank,
      broj:novbr
    }
    return this.http.post(`${this.uri}/preduzece/izmeniZiro`, podaci);

  }
  prihvati(pib){
    const podaci={
      pib:pib
    }
    return this.http.post(`${this.uri}/preduzece/prihvati`, podaci);

  }
  aktiviraj(pib){
    const podaci={
      pib:pib
    }
    return this.http.post(`${this.uri}/preduzece/aktiviraj`, podaci);

  }
  deaktiviraj(pib){
    const podaci={
      pib:pib
    }
    return this.http.post(`${this.uri}/preduzece/deaktiviraj`, podaci);

  }
  dodeli(sif,kat,potk){
    let kor=JSON.parse(localStorage.getItem('ulogovan'));
    const podaci={
      koris:kor.kor_ime,
      kat:kat,
      potk:potk,
      sif:sif
      
    }
    return this.http.post(`${this.uri}/preduzece/dodeli`, podaci);


  }
  odbij(pib){
    const podaci={
      pib:pib
    }

    return this.http.post(`${this.uri}/preduzece/odbij`, podaci);
  }
  
}
