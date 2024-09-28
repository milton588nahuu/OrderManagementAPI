import mongoose from 'mongoose';
const { Schema } = mongoose;
import {Categories} from '../interfaces/Northwin'

const Category = new Schema<Categories>({
    categoryID:{
        type:Number,
        required:true
      },
    category:{
        type:String,
        required:true
      },
    description:{
        type:String,
        required:true
      },
  },{
    timestamps: true,
    versionKey: false,
    collection:"categories"
  });


export default Category;