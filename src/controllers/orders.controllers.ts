
import {
  Request,
  Response
} from 'express'
import {
  ordCreator,
  ordShow,
  ordUpdate,
  ordDelete,
  ordShowByID
} from '../services/orders.service';
import {
  Orders
} from '../interfaces/Northwin';


import handleHttp from '../handlers/errors.controllers';
import { isExistOrd } from '../helpers/helpers';
const postOrder = async (req: Request, res: Response) => {
  try {
    const {
      orderID,
      customerID,
      employeeID,
      orderDate,
      shipperID,
    } = req.body;
    const newData: Orders = {
      orderID,
      customerID,
      employeeID,
      orderDate,
      shipperID,
    }
    console.log(newData);
    const existsField = await isExistOrd(newData);
    if (existsField.value) {
      res.status(202);
      res.json({ "msg": `the ${existsField.field} field exists` });
    } else {
      const result = await ordCreator(newData)
      res.status(201).json(result);
    }
  } catch (error) {
    console.log(error);
    handleHttp(res, "serverError");
  }
}

const getOrder = async (req: Request, res: Response) => {
  try {
    const results = await ordShow();
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    handleHttp(res, "serverError");
  }
}

const putOrder = async (req: Request<{ id: string }, Orders>, res: Response) => {
  try {
    const id = req.params.id;
    const {
      orderID,
      customerID,
      employeeID,
      orderDate,
      shipperID,
    } = req.body;
    const updata: Orders = {
      orderID,
      customerID,
      employeeID,
      orderDate,
      shipperID,
    }

    const result = await ordUpdate(id, updata);
    if (result === null) res.status(404).json({ message: "Not Found" });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    handleHttp(res, "serverError");
  }
}

const deleteOrder = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    const delOrd = await ordDelete(id);
    if (delOrd === null) res.status(404).json({ message: "Not Found" });
    res.json(delOrd);
  } catch (error) {
    console.log(error);
    handleHttp(res, "serverError");
  }
}

const getByIDOrder = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    const result = await ordShowByID(id);
    if (result === null) res.status(404).json({ message: "Not items Found" });
    res.json(result);
  } catch (error) {
    console.log(error);
    handleHttp(res, "serverError");
  }
}


export {
  postOrder,
  getOrder,
  putOrder,
  deleteOrder,
  getByIDOrder
}