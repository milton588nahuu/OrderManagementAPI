import {z} from 'zod';
/************
 * category *
 ************/ 
export const categoryValidator = z.object({
    categoryID:z.number({message:"The data entered must be a number"}).nonnegative("Category ID cannot be negative"),
    category:z.string({message:"The data entered must be a string"}).min(0).max(25),
    description:z.string({message:"The data entered must be a string"}).min(0).max(20)
});
export const categoryValidOptional = categoryValidator.partial();
export const categoryValidRequired = categoryValidator.required();