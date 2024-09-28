
import {
  Request,
  Response
} from 'express'
import {
  shippCreator,
  shippShow,
  shippDelete,
  shippShowByID,
  shippUpdate
} from '../services/shippers.service';
import {
  Shippers
} from '../interfaces/Northwin';
import handleHttp from '../handlers/errors.controllers';
import { isExistShipp } from '../helpers/helpers';

const postShipper = async (req: Request, res: Response) => {
  try {
    const {
      shipperID,
      shipperName,
      phone
    } = req.body;
    const newData: Shippers = {
      shipperID,
      shipperName,
      phone
    }
    console.log(newData);
    const existsField = await isExistShipp(newData);
    if (existsField.value) {
      res.status(202);
      res.json({ "msg": `the ${existsField.field} field exists` });
    } else {
      const result = await shippCreator(newData);
      res.status(201).json(result);
    }
  } catch (error) {
    handleHttp(res, "serverError");
  }
}

const getShipper = async (req: Request, res: Response) => {
  try {
    const results = await shippShow();
    res.status(200).json(results);
  } catch (error) {
    handleHttp(res, "serverError");
  }
}

const putShipper = async (req: Request<{ id: string }, Shippers>, res: Response) => {
  try {
    const id = req.params.id;
    const {
      shipperID,
      shipperName,
      phone
    } = req.body;
    const updata: Shippers = {
      shipperID,
      shipperName,
      phone
    }
    const result = await shippUpdate(id, updata);
    if (result === null) res.status(404).json({ message: "Not Found" });
    res.status(200).json(result);
  } catch (error) {
    handleHttp(res, "serverError");
  }
}

const deleteShipper = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    const delShipp = await shippDelete(id);
    if (delShipp === null) res.status(404).json({ message: "Not Found" });
    res.status(200).json(delShipp);
  } catch (error) {
    handleHttp(res, "serverError");
  }
}

const getByIDShipper = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    const result = await shippShowByID(id);
    if (result === null) res.status(404).json({ message: "Not items Found" });
    res.status(200).json(result);
  } catch (error) {
    handleHttp(res, "serverError");
  }
}


export {
  postShipper,
  getShipper,
  putShipper,
  deleteShipper,
  getByIDShipper
}