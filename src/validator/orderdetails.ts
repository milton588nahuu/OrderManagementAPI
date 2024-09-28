import {z} from 'zod';


/***************
 * orderdetail *
 ***************/
export const orderdetailValidator = z.object({
  orderDetailID:z.number({message:"The data entered must be a number"}).nonnegative("the number must be non-negative"),
  orderID:z.number({message:"The data entered must be a number"}).nonnegative("the number must be non-negative"),
  productID:z.number({message:"The data entered must be a number"}).nonnegative("the number must be non-negative"),
  quantity:z.number({message:"The data entered must be a number"}).nonnegative("the number must be non-negative"),
});
export const orderdetailValidOptional = orderdetailValidator.partial();
export const orderdetailValidRequired = orderdetailValidator.required();