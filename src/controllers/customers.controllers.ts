
import {
    Request,
    Response
} from 'express'
import {
    custCreator,
    custShow,
    custUpdate,
    custDelete,
    custShowByID
} from '../services/customers.service';
import {
    Customers
} from '../interfaces/Northwin';
import { custFilter } from '../services/filters.service';
import handleHttp from '../handlers/errors.controllers'
import {isExistCustomerts} from '../helpers/helpers'
const postCustomer = async (req: Request, res: Response) => {
    try {
        const {
            customerID,
            customerName,
            contactName,
            address,
            city,
            postalCode,
            country,
        } = req.body;
        const newData: Customers = {
            customerID,
            customerName,
            contactName,
            address,
            city,
            country,
            postalCode
        }
        const exitsField = await isExistCustomerts(newData);
        if(exitsField.value){
            res.status(202);
            res.json({"msg":`the ${exitsField.field} field exists`});
        } else {
            const result = await custCreator(newData);
            res.status(201).json(result);
        }
    } catch (error) {
        console.log(error);
        handleHttp(res, "serverError");
    }
}

const getCustomer = async (req: Request, res: Response) => {
    try {
        const results = await custShow();
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        handleHttp(res, "serverError");
    }
}

const putCustomer = async (req: Request<{ id: string }, Customers>, res: Response) => {
    try {
        const id = req.params.id;
        const {
            customerID,
            customerName,
            contactName,
            address,
            city,
            postalCode,
            country,
        } = req.body;
        const updata: Customers = {
            customerID,
            customerName,
            contactName,
            address,
            city,
            country,
            postalCode
        }
        console.log(updata);
        const result = await custUpdate(id, updata);
        if (result === null) res.status(404).json({ message: "Not Found" });
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        handleHttp(res, "serverError");
    }
}

const deleteCustomer = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = req.params.id;
        const delCustomer = await custDelete(id);
        if(delCustomer == null) res.status(404).json({ message: "Not Found" });
        res.status(200).json(delCustomer);
    } catch (error) {
        console.error(error);
        handleHttp(res, "serverError");
    }
}

const getByIDCustomer = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = req.params.id;
        const result = await custShowByID(id);
        if (result === null) res.status(404).json({ message: "Not items Found" });
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        handleHttp(res, "serverError");
    }
}


export {
    postCustomer,
    getCustomer,
    putCustomer,
    deleteCustomer,
    getByIDCustomer
}