import mongoose from 'mongoose';
const { Schema } = mongoose;
import {Orders} from '../interfaces/Northwin'

const Order = new Schema<Orders>({
    orderID:{ 
        type:Number,
        required:true
      },
    customerID:{ 
        type:Schema.Types.Number,
        ref:'customerID'
      },
    employeeID:{ 
        type:Number,
        ref:'employeeID'
      },
    orderDate:{
        type:Date,
        required:true
    },
    shipperID:{   
        type:Schema.Types.Number,
        ref:'shipperID'
      },
  },{
    timestamps: true,
    versionKey: false,
    collection:"orders"
  });


export default Order;