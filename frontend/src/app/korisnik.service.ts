import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Korisnik } from './model/korisnik';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http: HttpClient) { }

  uri='http://localhost:4000'

  prijavaNaSistem(kor_ime, lozinka){
    const podaci={
      kor_ime: kor_ime,
      lozinka: lozinka
    }

    return this.http.post(`${this.uri}/user/prijavaNaSistem`, podaci);
  }

  dohvatiKorisnika(kor_ime){
    const podaci={
      kor_ime: kor_ime
    }

    return this.http.post(`${this.uri}/user/dohvatiKorisnika`, podaci);
  }
  dohvatiMejl(mejl){
    const podaci={
      mejl: mejl
    }

    return this.http.post(`${this.uri}/user/dohvatiMejl`, podaci);
  }
  dohvatiLk(kor_ime){
    const podaci={
      lk: kor_ime
    }

    return this.http.post(`${this.uri}/user/dohvatiLk`, podaci);
  }
  registrujSe(url,kor_ime, lozinka, adresa, pib, mat, ime,prezime, mejl, broj, naziv){
    let korisnik=JSON.parse(localStorage.getItem('ulogovan'));
    const podaci={
      kor_ime: kor_ime,
      lozinka: lozinka,
      adresa:adresa,
      pib:pib,
      mat:mat,
      mejl:mejl,
      ime:ime,
      prezime:prezime,
      broj:broj,
      naziv:naziv,
      tipKor:korisnik.tip,
      slika:url
      
    
    }
    return this.http.post(`${this.uri}/user/registrujSe`, podaci);
  }
  regisPred(url,kor_ime, lozinka, adresa, pib, mat, ime,prezime, mejl, broj, naziv){
    let korisnik=JSON.parse(localStorage.getItem('ulogovan'));
    const podaci={
      kor_ime: kor_ime,
      lozinka: lozinka,
      adresa:adresa,
      pib:pib,
      mat:mat,
      mejl:mejl,
      ime:ime,
      prezime:prezime,
      broj:broj,
      naziv:naziv,
      pk:korisnik.kor_ime,
      slika:url
    
    }
    return this.http.post(`${this.uri}/user/regisPred`, podaci);
  }
  unesi(kor_ime, lozinka,ime,prezime, broj,brLk){
    
    const podaci={
      kor_ime: kor_ime,
      lozinka: lozinka,
      ime:ime,
      prezime:prezime,
      broj:broj,
      brLk:brLk
  
    }
    return this.http.post(`${this.uri}/user/unos`, podaci);
  }
  promeniLoz(loz1,loz2){
    const podaci={
      loz1:loz1,
      loz2:loz2
    }
    return this.http.post(`${this.uri}/user/promeniLoz`, podaci);
  }
  
}