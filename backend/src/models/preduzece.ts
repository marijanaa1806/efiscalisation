import mongoose from 'mongoose';


const Schema = mongoose.Schema;

let Preduzece = new Schema(
    {
        kor_ime: {
            type: String
        },
        naziv: {
            type: String
        },
        adresa:{
            type: String
        },
        PIB: {
            type: String
        },
        matBr: {
            type: String
        },
        odobreno:{
            type:Boolean
        },
        aktivno:{
            type:Boolean
        },
        magacini: {
            type: [{
                id:String,
                naziv:String
            }]
           
        },
        kase: {
            type:[{
                lokacija:String,
                tip:String
            }]
        },
        ziro: {
            type: [{
                banka:String,
                brojR:String
            }]
           
        },
        pdv: {
            type: Boolean
        },
        kategorije: {
            type: String
        },
        sifre: {
            type: Array
            
        },
        narucioci: {
            type: Array
            
        },
        artikli:{
            type: [{
                jedinica:String,
                naziv:String,
                proizvodjac:String,
                stopa:Number,
                sifra:String,
                kateg:String,
                potk:String,
                k:Boolean,
                tip:String,
                zem:String,
                car:Number,
                strnaz:String,
                barkod:String,
                ekot:Boolean,
                akcize:Boolean,
                min:Number,
                max:Number,
                opis:String,
                dekl:String,
                slika:String
            }]
            
        },
        slika:{
            type:String
        },
        pazari:{
            type:[{
                datum:String,
                iznos:Number,
                porez:Number
            }]
        },
        prvi:{
            type:Boolean
        },
        ostali:{
            type:Boolean
        },
        difolt:{
            type:String
        }
        
    }
)

export default mongoose.model('predModel',Preduzece,'preduzece')