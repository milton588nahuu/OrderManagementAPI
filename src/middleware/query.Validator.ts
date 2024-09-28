import {Request,Response,NextFunction } from 'express';
import {productValidOptional} from '../validator/products';
import {categoryValidOptional} from '../validator/categories';
import {customerValidOptional} from '../validator/customers';
import {employeeValidOptional} from '../validator/employees';
import {orderValidOptional} from '../validator/orders';
import {orderdetailValidOptional} from '../validator/orderdetails';
import {shipperValidOptional} from '../validator/shippers';
import {supplierValidOptional} from '../validator/suppliers';
/**
 * Categories
 */
export const categQueryValid = (req:Request,res:Response,next:NextFunction) => {
    const queryString = JSON.stringify(req.query);
    const queryObject = JSON.parse(queryString);
    console.log(queryObject);
    const validate = categoryValidOptional.safeParse({queryObject});
    if(validate.success){
        next();
    }
    else{
        console.error('Invalid data');
        res.status(400).json({message:`${validate.error.format}`});
    }
} 
/**
 * Customers
 */
export const custQueryValid = (req:Request,res:Response,next:NextFunction) => {
    const queryString = JSON.stringify(req.query);
    const queryObject = JSON.parse(queryString);
    console.log(queryObject);
    const validate = customerValidOptional.safeParse({queryObject});

    if(validate.success){
        next();
    }
    else{
        console.error('Invalid data');
        res.status(400).json({message:`${validate.error.format}`});
    }
} 
/**
 * Products
 */
export const prodQueryValid = (req:Request,res:Response,next:NextFunction) => {
    const queryString = JSON.stringify(req.query);
    const queryObject = JSON.parse(queryString);
    console.log(queryObject);
    const validate = productValidOptional.safeParse({queryObject});

    if(validate.success){
        next();
    }
    else{
        console.error('Invalid data');
        res.status(400).json({message:`${validate.error.format}`});
    }
} 
/**
 * Employees
 */
export const emplQueryValid = (req:Request,res:Response,next:NextFunction) => {
    const queryString = JSON.stringify(req.query);
    const queryObject = JSON.parse(queryString); 
    const validate = employeeValidOptional.safeParse({queryObject});
    if(validate.success){
        next();
    }
    else{
        console.error('Invalid data');
        res.status(400).json({message:`${validate.error.format}`});
    }
} 
/**
 * Order
 */
export const orderQueryValid = (req:Request,res:Response,next:NextFunction) => {
    const queryString = JSON.stringify(req.query);
    const queryObject = JSON.parse(queryString);
    console.log(queryObject);
    const validate = orderValidOptional.safeParse({queryObject});
    if(validate.success){
        next();
    }
    else{
        console.error('Invalid data');
        res.status(400).json({message:`${validate.error.format}`});
    }
} 
/**
 * Orderdetails
 */
export const orderDetQueryValid = (req:Request,res:Response,next:NextFunction) => {
    const queryString = JSON.stringify(req.query);
    const queryObject = JSON.parse(queryString);
    console.log(queryObject);
    const validate = orderdetailValidOptional.safeParse({queryObject});
    if(validate.success){
        next();
    }
    else{
        console.error('Invalid data');
        res.status(400).json({message:`${validate.error.format}`});
    }
} 
/**
 * Suppliers
 */
export const suppQueryValid = (req:Request,res:Response,next:NextFunction) => {
    const queryString = JSON.stringify(req.query);
    const queryObject = JSON.parse(queryString);
    console.log(queryObject);
    const validate = supplierValidOptional.safeParse({queryObject});

    if(validate.success){
        next();
    }
    else{
        console.error('Invalid data');
        res.status(400).json({message:`${validate.error.format}`});
    }
} 
/**
 * Shippers
 */
export const shippQueryValid = (req:Request,res:Response,next:NextFunction) => {
    const queryString = JSON.stringify(req.query);
    const queryObject = JSON.parse(queryString);
    console.log(queryObject);
    const validate = shipperValidOptional.safeParse({queryObject});

    if(validate.success){
        next();
    }
    else{
        console.error('Invalid data');
        res.status(400).json({message:`${validate.error.format}`});
    }
} 