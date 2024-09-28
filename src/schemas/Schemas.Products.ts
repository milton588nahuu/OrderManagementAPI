import mongoose from 'mongoose';
const { Schema } = mongoose;
import {Products} from '../interfaces/Northwin'

const Product = new Schema<Products>({
    productID:{
        type:Number,
        required:true
      },
    productName:{
        type:String,
        required:true
      },
    supplierID:{  //referencia a suppliers
        type:Schema.Types.Number,
        ref:'supplerID'
      },
    categoryID:{ //referencia a categories
        type:Schema.Types.Number,
        ref:'categoryID'
      },
    unit:{
        type:String,
        required:true
      },
    price:{
        type:Number,
        required:true
      },
  },{
    timestamps: true,
    versionKey: false,
    collection:"products"
  });


export default Product;