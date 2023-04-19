import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RacunService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000'
  dodajRac(r){
    const podaci={
      r:r
    }
    return this.http.post(`${this.uri}/racun/dodajRac`, podaci);
  }
  dodajSt(r){

  }
 
  zauzmiSto(ob,ids,pred){
    const podaci={
      ob:ob,
      ids:ids,
      pred:pred
    }
    return this.http.post(`${this.uri}/objekti/zauzmiSto`, podaci);

  }
  oslobodiSto(ob,ids,pred){
    const podaci={
      ob:ob,
      ids:ids,
      pred:pred
    }
    return this.http.post(`${this.uri}/objekti/oslobodiSto`, podaci);

  }
  izmeniSto(ob,sto,pred){
    const podaci={
      ob:ob,
      sto:sto,
      pred:pred
    }
    return this.http.post(`${this.uri}/objekti/izmeniSto`, podaci);


  }
  dohvatiRacun(ob,ids,pred){
    const podaci={
      ob:ob,
      ids:ids,
      pred:pred
    }
    return this.http.post(`${this.uri}/racun/dohvatiRacun`, podaci);


  }
  ubaciStavku(ob,ids,pred,st){
    const podaci={
      ob:ob,
      ids:ids,
      pred:pred,
      st:st
      
    }
    return this.http.post(`${this.uri}/racun/ubaciStavku`, podaci);

  }
  zatvoriRacun(ob,ids,pred){
    const podaci={
      ob:ob,
      ids:ids,
      pred:pred,
     
    }
    return this.http.post(`${this.uri}/racun/zatvoriRacun`, podaci);


  }
  unesiDetalje(dat,porez,iznos,ob,ids,pred,dato,kusur,ime,prez,lk,nacin,slip,naruc){
    const podaci={
      dato:dato,
      kusur:kusur,
      ime:ime,
      prez:prez,
      lk:lk,
      nacin:nacin,
      slip:slip,
      naruc:naruc,
      ob:ob,
      ids:ids,
      pred:pred,
      iznos:iznos,
      porez:porez,
      datum:dat

    }
    return this.http.post(`${this.uri}/racun/unesiDetalje`, podaci);
  }
  uvecajPazar(korime,datum,iznos,porez){
    const podaci={
      korime:korime,
      datum:datum,
      iznos:iznos,
      porez:porez
    }
    return this.http.post(`${this.uri}/racun/uvecajPazar`, podaci);
  }
  umanjiAr(sifra,mag,kol,kor){
    const podaci={
      sifra:sifra,
      mag:mag,
      kol:kol,
      kor:kor
    }
    return this.http.post(`${this.uri}/robe/umanjiAr`, podaci);

  }
  dnevni(kor){
    const podaci={
      kor:kor
    }
    return this.http.post(`${this.uri}/racun/dnevni`, podaci);
  }
  mojiR(lk){
    const podaci={
      lk:lk
    }
    return this.http.post(`${this.uri}/racun/mojiR`, podaci);

  }
  sortirani(){
    return this.http.get(`${this.uri}/racun/sortirani`);
  }
}
