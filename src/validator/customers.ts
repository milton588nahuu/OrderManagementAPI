import {z} from 'zod';

/************
 * customer *
 ************/
export const customerValidator = z.object({
    customerID:z.number({message:"The data entered must be a number"}).nonnegative("the number must be non-negative"),
    customerName:z.string({message:"The data entered must be a string"}).max(20),
    contactName:z.string({message:"The data entered must be a string"}).max(20),
    address:z.string({message:"The data entered must be a string"}).max(20),
    city:z.string({message:"The data entered must be a string"}).max(20),
    postalCode:z.string({message:"The data entered must be a string"}).max(8),
    country:z.string({message:"The data entered must be a string"}).max(20)
});
export const customerValidOptional = customerValidator.partial();
export const customerValidRequired = customerValidator.required();