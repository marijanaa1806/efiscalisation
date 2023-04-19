 import mongoose from 'mongoose';

const Schema = mongoose.Schema;
let Robe=new Schema({
    magacin:{
        type:String
        
    },
    nabavna:{
        type:String},
    prodajna:{
        type:String
    },
    max:{
        type:Number
    },
    min:{
        type:Number
    },
    stanje:{
        type:Number
    },
    nazivm:{
        type:String
    },
    artikal:{
        type:String
    },
    selected:{
        type:Boolean
    },
    kolicina:{
        type:Number
    },
    preduzece:{
        type:String
    }

})
export default mongoose.model('robaModel',Robe,'robe')