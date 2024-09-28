
import {
  Request,
  Response
} from 'express'
import {
  prodCreator,
  prodShow,
  prodUpdate,
  prodDelete,
  prodShowByID
} from '../services/products.service';
import {
  Products
} from '../interfaces/Northwin';

import handleHttp from '../handlers/errors.controllers';
import { isExistProduct } from '../helpers/helpers';

const postProd = async (req: Request, res: Response) => {
  try {
    const {
      productID,
      productName,
      supplierID,
      categoryID,
      unit,
      price,
    } = req.body;
    const newData: Products = {
      productID,
      productName,
      supplierID,
      categoryID,
      unit,
      price,
    }
    const existsField = await isExistProduct(newData);
    if (existsField.value){
      res.status(202);
      res.json({"msg":`the ${existsField.field} field exists`});
    }else{
      const result = await prodCreator(newData);
      res.status(201).json(result);
    }
  } catch (error) {
    handleHttp(res, "serverError");
  }
}

const getProd = async (req: Request, res: Response) => {
  try {
    const results = await prodShow();
    res.status(200).json(results);
  } catch (error) {
    handleHttp(res, "serverError");
  }
}

const putProd = async (req: Request<{ id: string }, Products>, res: Response) => {
  try {
    const id = req.params.id;
    const {
      productID,
      productName,
      supplierID,
      categoryID,
      unit,
      price,
    } = req.body;
    const updata: Products = {
      productID,
      productName,
      supplierID,
      categoryID,
      unit,
      price,
    }
    const result = await prodUpdate(id, updata);
    if (result === null) res.status(404).json({ message: "Not Found" });
    res.status(200).json(result);
  } catch (error) {
    handleHttp(res, "serverError");
  }
}

const deleteProd = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    const delProd = await prodDelete(id);
    if(delProd === null) res.status(404).json({ message: "Not Found" });
    res.status(200).json(delProd);
  } catch (error) {
    handleHttp(res, "serverError");
  }
}

const getByIDProd = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    const result = await prodShowByID(id);
    if (result === null) res.status(404).json({ message: "Not items Found" });
    res.status(200).json(result);
  } catch (error) {
    handleHttp(res, "serverError");
  }
}

export {
  postProd,
  getProd,
  putProd,
  deleteProd,
  getByIDProd
}