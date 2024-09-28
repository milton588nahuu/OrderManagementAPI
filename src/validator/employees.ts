import {z} from 'zod';

/************
 * employye *
 ************/
export const employeeValidator = z.object({
    employeeID:z.number({message:"The data entered must be a number"}).nonnegative("the number must be non-negative"),
    firstName:z.string({message:"The data entered must be a string"}).max(25),
    lastName:z.string({message:"The data entered must be a string"}).max(25),
    birthdate:z.string({message:"The data entered must be a string"}).regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
        const date = new Date(value);
        return !isNaN(date.getTime()) && date.toISOString().startsWith(value);
    }, { message: 'Invalid birthdate format' }),
    photo:z.string({message:"The data entered must be a string"}).max(25),
    notes:z.string({message:"The data entered must be a string"}).max(500)
});
export const employeeValidOptional = employeeValidator.partial();
export const employeeValidRequired = employeeValidator.required();