import mongoose from 'mongoose';
import racun from './racun';

const Schema = mongoose.Schema;
let Objekti=new Schema({
    naziv:{
        type:String
    },
    stolovi:{
        type:[{
            ids:Number,
    xkoor:Number,
    ykoor:Number,
    sirina:Number,
    visina:Number,
    oblik:String,
    zauzet:Boolean
        }]
    },
    preduzece:{
        type:String
    }
})
export default mongoose.model('objekatModel',Objekti,'objekti')
