import mongoose from 'mongoose';
const { Schema } = mongoose;
import { Shippers } from '../interfaces/Northwin'

const Shipper = new Schema<Shippers>({
  shipperID:{ 
    type:Number,
    required:true
  },
  shipperName:{
    type:String,
    required:true
  },
  phone:{
    type:String,
    required:true
  }
  },{
    timestamps: true,
    versionKey: false,
    collection:"shippers"
  });



export default Shipper;