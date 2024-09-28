import {z} from 'zod';

/*********
 * order *
 *********/
export const orderValidator = z.object({
  orderID:z.number({message:"The data entered must be a number"}).nonnegative("the number must be non-negative"),
  customerID:z.number({message:"The data entered must be a number"}).nonnegative("the number must be non-negative"),
  employeeID:z.number({message:"The data entered must be a number"}).nonnegative("the number must be non-negative"),
  orderDate:z.string({message:"The data entered must be a string"}).regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime()) && date.toISOString().startsWith(value);
  }, { message: 'Invalid date format' }),
  shipperID:z.number({message:"The data entered must be a number"}).nonnegative("the number must be non-negative"),
});
export const orderValidOptional = orderValidator.partial();
export const orderValidRequired = orderValidator.required();