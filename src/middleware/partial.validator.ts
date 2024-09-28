import { Request, Response, NextFunction } from "express";
import { productValidOptional } from '../validator/products'
import { categoryValidOptional } from "../validator/categories";
import { customerValidOptional } from "../../src/validator/customers";
import { employeeValidOptional } from '../../src/validator/employees';
import { orderValidOptional } from '../validator/orders';
import { orderdetailValidOptional } from '../../src/validator/orderdetails';
import { shipperValidOptional } from '../../src/validator/shippers';
import { supplierValidOptional } from '../../src/validator/suppliers';
/************
 * category *
 ************/
export const categoryValidatorPartial = (req: Request, res: Response, next: NextFunction) => {
    const Validate = categoryValidOptional.safeParse(req.body)
    if (Validate.success) {
        next();
    } else {
        console.error('Datos inválidos');
        res.status(400)
        res.json({ message: `${Validate.error.format}` });
    }
}
/************
 * employye *
 ************/
export const employeeValidatorPartial = (req: Request, res: Response, next: NextFunction) => {
    const Validate = employeeValidOptional.safeParse(req.body)
    if (Validate.success) {
        next();
    }
    else {
        console.error('Datos inválidos');
        res.status(400).json({ message: `${Validate.error.format}` });
    }
}
/************
 * customer *
 ************/
export const customerValidatorPartial = (req: Request, res: Response, next: NextFunction) => {
    const Validate = customerValidOptional.safeParse(req.body)
    if (Validate.success) {
        next();
    }
    else {
        console.error('Datos inválidos');
        res.status(400).json({ message: `${Validate.error.format}` });
    }
}
/***********
 * shipper *
 ***********/
export const shipperValidatorPartial = (req: Request, res: Response, next: NextFunction) => {
    const Validate = shipperValidOptional.safeParse(req.body)
    if (Validate.success) {
        next();
    }
    else {
        console.error('Datos inválidos');
        res.status(400).json({ message: `${Validate.error.format}` });
    }
}
/************
 * supplier *
 ************/
export const supplierValidatorPartial = (req: Request, res: Response, next: NextFunction) => {
    const Validate = supplierValidOptional.safeParse(req.body)
    if (Validate.success) {
        next();
    }
    else {
        console.error('Datos inválidos');
        res.status(400).json({ message: `${Validate.error.format}` });
    }
}
/*********
 * order *
 *********/
export const orderValidatorPartial = (req: Request, res: Response, next: NextFunction) => {
    const Validate = orderValidOptional.safeParse(req.body)
    if (Validate.success) {
        next();
    }
    else {
        console.error('Datos inválidos');
        res.status(400).json({ message: `${Validate.error.format}` });
    }
}
/***************
 * orderdetail *
 ***************/
export const orderdetailValidatorPartial = (req: Request, res: Response, next: NextFunction) => {
    const Validate = orderdetailValidOptional.safeParse(req.body)
    if (Validate.success) {
        next();
    }
    else {
        console.error('Datos inválidos');
        res.status(400).json({ message: `${Validate.error.format}` });
    }
}

/***********
 * product *
 ***********/
export const productValidatorPartial = (req: Request, res: Response, next: NextFunction) => {
    const Validate = productValidOptional.safeParse(req.body)
    if (Validate.success) {
        next();
    }
    else {
        console.error('Datos inválidos');
        res.status(400).json({ message: `${Validate.error.format}` });
    }
}

