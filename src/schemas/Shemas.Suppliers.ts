import mongoose from 'mongoose';
const { Schema } = mongoose;
import {Suppliers} from '../interfaces/Northwin'

const Supplier = new Schema<Suppliers>({
  supplierID:{ 
    type:Number,
    required:true
  },
  supplierName:{
    type:String,
    required:true
  },
  contactName:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  postalCode:{
    type:String,
    required:true
  },
  country:{
    type:String,
    required:true
  },
  phone:{
    type:String,
    required:true
  },
  },{
    timestamps: true,
    versionKey: false,
    collection:"suppliers"
  });

  export default Supplier;
