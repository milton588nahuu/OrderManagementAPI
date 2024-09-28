import {z} from 'zod';

/***********
 * shipper *
 ***********/
export const shipperValidator = z.object({
  shipperID:z.number({message:"The data entered must be a number"}),
  shipperName:z.string({message:"The data entered must be a string"}),
  phone:z.string({message:"The data entered must be a string"}),
});
export const shipperValidOptional = shipperValidator.partial();
export const shipperValidRequired = shipperValidator.required();