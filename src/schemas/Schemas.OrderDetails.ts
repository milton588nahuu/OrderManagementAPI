import mongoose from 'mongoose';
const { Schema } = mongoose;
import {OrderDetails} from '../interfaces/Northwin'

//ver referencias 

const OrderDetails = new Schema<OrderDetails>({
    orderDetailID:{
        type:Number,
        required:true
      },
    orderID:{
        type:Schema.Types.Number,
        ref:'OrderID'
      },
    productID:{
        type:Schema.Types.Number,
        ref:'productID'
      },
    quantity:{
        type:Number,
        required:true
      },
  },{
    timestamps: true,
    versionKey: false,
    collection:"orderdetails"
  });


export default OrderDetails;