
import {
  Request,
  Response
} from 'express'
import {
  ordDetailsCreator,
  ordDetailsShow,
  ordDetailsUpdate,
  ordDetailsDelete,
  ordDetailsShowByID
} from '../services/orderdetails.service';
import {
  OrderDetails
} from '../interfaces/Northwin';

import handleHttp from '../handlers/errors.controllers';
import { isExistOrdDet } from '../helpers/helpers';
const postOrdeDet = async (req: Request, res: Response) => {
  try {
    const {
      orderDetailID,
      orderID,
      productID,
      quantity,
    } = req.body;
    const newData: OrderDetails = {
      orderDetailID,
      orderID,
      productID,
      quantity,
    }
    const existsField = await isExistOrdDet(newData);
    console.log(existsField.value);
    if (existsField.value) {
      res.status(202);
      res.json({ "msg": `the ${existsField.field} field exists` });
    } else {
      const result = await ordDetailsCreator(newData);
      res.status(201).json(result);
    }
  } catch (error) {
    console.error(error);
    handleHttp(res, "serverError");
  }
}

const getOrdeDet = async (req: Request, res: Response) => {
  try {
    const results = await ordDetailsShow();
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    handleHttp(res, "serverError");
  }
}

const putOrdeDet = async (req: Request<{ id: string }, OrderDetails>, res: Response) => {
  try {
    const id = req.params.id;
    const {
      orderDetailID,
      orderID,
      productID,
      quantity,
    } = req.body;
    const updata: OrderDetails = {
      orderDetailID,
      orderID,
      productID,
      quantity,
    }
    const result = await ordDetailsUpdate(id, updata);
    if (result === null) res.status(404).json({ message: "Not Found" });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    handleHttp(res, "serverError");
  }
}

const deleteOrdeDet = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    const delOrdDet = await ordDetailsDelete(id);
    if (delOrdDet === null) res.status(404).json({ message: "Not Found" });
    res.status(200).json(delOrdDet);
  } catch (error) {
    console.error(error);
    handleHttp(res, "serverError");
  }
}

const getByIDOrdeDet = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    const result = await ordDetailsShowByID(id);
    if (result === null) res.status(404).json({ message: "Not items Found" });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    handleHttp(res, "serverError");
  }
}




export {
  postOrdeDet,
  getOrdeDet,
  putOrdeDet,
  deleteOrdeDet,
  getByIDOrdeDet
}