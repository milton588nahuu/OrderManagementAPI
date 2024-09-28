import mongoose from 'mongoose';
import { Customers } from '../interfaces/Northwin';
const { Schema } = mongoose;



const Customer = new Schema<Customers>({
  customerID:{
    type:Number,
    required:true
  },
  customerName:{
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
  country:{
    type:String,
    required:true
  },
  postalCode:{
    type:String,
    required:true
  }
  },{
    timestamps: true,
    versionKey: false,
    collection:"customers"
  });


export default Customer;