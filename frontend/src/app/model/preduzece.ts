import { Artikal } from "./artikal";
import { Kasa } from "./kasa";
import { Magacin } from "./magacin";
import { NalaziSe } from "./nalaziSe";
import { Narucilac } from "./narucilac";
import { Objekat } from "./objekat";
import { Pazar } from "./pazar";
import { Robe } from "./robe";
import { ZiroRacun } from "./ziror";

export class Preduzece{
    kor_ime: string;
	naziv:string;
	adresa:string;
	PIB:string;
	matBr:string;
	odobreno:Boolean;
	aktivno:Boolean;
	magacini:Array<Magacin>;
	kase:Array<Kasa>;
	ziro:Array<ZiroRacun>;
	pdv:Boolean;
	kategorije:string;
	sifre:Array<string>;
	narucioci:Array<Narucilac>
	artikli:Array<Artikal>
	slika:String;
	pazari:Array<Pazar>;
	prvi:Boolean;
	ostali:Boolean;
	difolt:String;
	mojeRobe:Array<Robe>
	

}