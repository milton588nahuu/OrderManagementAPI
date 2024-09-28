
import {
  Request,
  Response
} from 'express'
import {
  suppCreator,
  suppShow,
  suppUpdate,
  suppDelete,
  suppShowByID
} from '../services/suppliers.service';
import {
  Suppliers
} from '../interfaces/Northwin';

import handleHttp from '../handlers/errors.controllers';
import { isExistSupp } from '../helpers/helpers';

const postSupplier = async (req: Request,res: Response) => {
  try {
    const {
      supplierID,
      supplierName,
      contactName,
      address,
      city,
      postalCode,
      country,
      phone
    } = req.body;
    const newData: Suppliers = {
      supplierID,
      supplierName,
      contactName,
      address,
      city,
      postalCode,
      country,
      phone
    }
    console.log(newData);
    const existsField = await isExistSupp(newData);
    if (existsField.value) {
      res.status(202);
      res.json({"msg":`the ${existsField.field} field exists`});
    }else{
      const result = await suppCreator(newData);
      res.status(201).json(result);
    }
  } catch (error) {
    handleHttp(res, "serverError");
  }
}

const getSupplier = async (req: Request, res: Response) => {
  try {
    const results = await suppShow();
    res.status(200).json(results);
  } catch (error) {
    handleHttp(res, "serverError");
  }
}

const putSupplier = async (req: Request<{ id: string }, Suppliers>, res: Response) => {
  try {
    const id = req.params.id;
    const {
      supplierID,
      supplierName,
      contactName,
      address,
      city,
      postalCode,
      country,
      phone
    } = req.body;
    const updata: Suppliers = {
      supplierID,
      supplierName,
      contactName,
      address,
      city,
      postalCode,
      country,
      phone
    }
    console.log(updata);
    const result = await suppUpdate(id, updata);
    if (result === null) res.status(404).json({ message: "Not Found" });
    res.json(result);
  } catch (error) {
    handleHttp(res, "serverError");
  }
}

const deleteSupplier = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    const delSupp = await suppDelete(id);
    if(delSupp === null) res.status(404).json({ message: "Not Found" });
    res.json(delSupp);
  } catch (error) {
    handleHttp(res, "serverError");
  }
}

const getByIDSupplier = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    const result = await suppShowByID(id);
    if (result === null) res.status(404).json({ message: "Not Found" });
    res.json(result);
  } catch (error) {
    handleHttp(res, "serverError");
  }
}


export {
  postSupplier,
  getSupplier,
  putSupplier,
  deleteSupplier,
  getByIDSupplier
}