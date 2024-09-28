import {z} from 'zod';

/***********
 * product *
 ***********/
export const productValidator = z.object({
  productID:z.number({message:"The data entered must be a number"}).nonnegative("the number must be non-negative"),
  productName:z.string({message:"The data entered must be a string"}),
  supplierID:z.number({message:"The data entered must be a number"}).nonnegative("the number must be non-negative"),
  categoryID:z.number({message:"The data entered must be a number"}).nonnegative("the number must be non-negative"),
  unit:z.string({message:"The data entered must be a string"}),
  price:z.number({message:"The data entered must be a number"}).nonnegative("the number must be non-negative"),
});
export const productValidOptional = productValidator.partial();
export const productValidRequired = productValidator.required();