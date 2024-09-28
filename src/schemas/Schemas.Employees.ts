import mongoose from 'mongoose';
const { Schema } = mongoose;
import {Employees} from '../interfaces/Northwin'

const Employee = new Schema<Employees>({
  employeeID: {
    type:Number,
    required:true
  },
  firstName: {
    type:String,
    required:true
  },
  lastName: {
    type:String,
    required:true
  },
  birthdate: {
    type:String,
    required:true
  },
  photo: {
    type:String,
    required:false
  },
  notes: {
    type:String,
    required:false
  },
}, {
  timestamps: true,
  versionKey: false,
    collection:"employees",
});


export default Employee;