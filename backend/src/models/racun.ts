import mongoose from "mongoose";
const Schema = mongoose.Schema;
let Racun=new Schema({
    idS:{
        type:Number
    },
    objekat:{
        type:String
    },
    iznos:{
        type:Number
    },
    datum:{
        type:String
    },
    porez:{
        type:Number
    },
    stavke:{
        type:Array
    },
    zatvoren:{
        type:Boolean
    },
    preduz:{
        type:String
    },
    dato:{
        type:Number
    },
    kusur:{
        type:Number
    },
    ime:{
        type:String
    },
    prezime:{
        type:String
    },
    brLk:{
        type:String
    },
    nacinPlacanja:{
        type:String
    },
    slip:{
        type:String
    },
    narucilac:{
        type:String
    }

})
export default mongoose.model('racunModel',Racun,'racun')

