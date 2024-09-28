import {z} from 'zod';

/************
 * supplier *
 ************/
export const supplierValidator = z.object({
    supplierID:z.number({message:"The data entered must be a number"}).nonnegative("the number must be non-negative"),
    supplierName:z.string({message:"The data entered must be a string"}),
    contactName:z.string({message:"The data entered must be a string"}),
    address:z.string({message:"The data entered must be a string"}),
    city:z.string({message:"The data entered must be a string"}),
    postalCode:z.string({message:"The data entered must be a string"}),
    country:z.string({message:"The data entered must be a string"}),
    phone:z.string({message:"The data entered must be a string"}),
});
export const supplierValidOptional = supplierValidator.partial();
export const supplierValidRequired = supplierValidator.required();