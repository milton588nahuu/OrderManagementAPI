import handleHttp from '../handlers/errors.controllers';
import {Request,Response,NextFunction} from 'express';
import {categoryValidRequired} from '../validator/categories';
import {customerValidRequired} from '../validator/customers'
import {employeeValidRequired} from '../validator/employees'
import {orderValidRequired} from '../validator/orders'
import {orderdetailValidRequired} from '../validator/orderdetails'
import {productValidRequired} from '../validator/products'
import {shipperValidRequired} from '../validator/shippers'
import {supplierValidRequired} from '../validator/suppliers'
/************
 * category *
 ************/ 
export const categoryValidator = (req: Request, res: Response, next: NextFunction) => {
    const Validate = categoryValidRequired.safeParse(req.body)
    if(Validate.success){
        next();
    }else{
        console.error('Datos inválidos:', Validate.error.format());
        //handleHttp(res,"invalid data");
        res.status(400);
        res.send("Datos inválidos");
    }
}
/************
 * employye *
 ************/
export const employeeValidator = (req: Request, res: Response, next: NextFunction) => {
    const Validate = employeeValidRequired.safeParse(req.body)
    if(Validate.success){
        next();
    }else{
        console.error('Datos inválidos:', Validate.error.format());
        handleHttp(res,"invalid data");
        res.status(400);
    }
}
/************
 * customer *
 ************/
export const customerValidator = (req: Request, res: Response, next: NextFunction) => {
    const Validate = customerValidRequired.safeParse(req.body)
    if(Validate.success){
        next();
    }else{
        console.error('Datos inválidos:', Validate.error.format());
        handleHttp(res,"invalid data");
        res.status(400);
    }
}
/***************
 * orderdetail *
 ***************/
export const orderdertailValidator = (req: Request, res: Response, next: NextFunction) => {
    const Validate = orderdetailValidRequired.safeParse(req.body);
    console.log(Validate);
    if(Validate.success){
        next();
    }else{
        console.error('Datos inválidos:', Validate.error.format());
        handleHttp(res,"invalid data");
        res.status(400);
    }
}
/*********
 * order *
 *********/
export const orderValidator = (req: Request, res: Response, next: NextFunction) => {
    const Validate = orderValidRequired.safeParse(req.body)
    if(Validate.success){
        next();
    }else{
        console.error('Datos inválidos:', Validate.error.format());
        handleHttp(res,"invalid data");
        res.status(400);
    }
}
/***********
 * product *
 ***********/
export const productValidator = (req: Request, res: Response, next: NextFunction) => {
    const Validate = productValidRequired.safeParse(req.body)
    if(Validate.success){
        next();
    }else{
        console.error('Datos inválidos:', Validate.error.format());
        handleHttp(res,"invalid data");
        res.status(400);
    }
}
/***********
 * shipper *
 ***********/
export const shipperValidator = (req: Request, res: Response, next: NextFunction) => {
    const Validate = shipperValidRequired.safeParse(req.body)
    if(Validate.success){
        next();
    }else{
        console.error('Datos inválidos:', Validate.error.format());
        handleHttp(res,"invalid data");
        res.status(400);
    }
}
/************
 * supplier *
 ************/
export const supplierValidator = (req: Request, res: Response, next: NextFunction) => {
    const Validate = supplierValidRequired.safeParse(req.body)
    if(Validate.success){
        next();
    }else{
        console.error('Datos inválidos:', Validate.error.format());
        handleHttp(res,"invalid data");
        res.status(400);
    }
}