import {
  Request,
  Response
} from 'express'
import {
  categCreator,
  categShow,
  categDelete,
  categShowByID,
  categUpdate,
} from '../services/categories.service';
import {
  Categories
} from '../interfaces/Northwin';
import handleHttp from '../handlers/errors.controllers'

import { isExistCateg } from '../../src/helpers/helpers';

const postCategory = async (req: Request, res: Response) => {
  try {
    const {
      categoryID,
      category,
      description,
    } = req.body;
    const newData: Categories = {
      category,
      description,
      categoryID,
    }
    const exitsField = await isExistCateg(newData);
    console.log(exitsField.value);
    if (exitsField.value) {
      res.status(202);
      res.json({ "msg": `the ${exitsField.field} field exists` });
    } else {
      const result = await categCreator(newData);
      res.status(201).json(result);
    }
  } catch (error) {
    console.log(error);
    handleHttp(res, "serverError");
  }
}

const getCategory = async (req: Request, res: Response) => {
  try {
    let results = await categShow();
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    handleHttp(res, "serverError");
  }
}

const putCategory = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    const {
      categoryID,
      category,
      description,
    } = req.body;
    const updata: Categories = {
      category,
      description,
      categoryID,
    }
    const result = await categUpdate(id, updata);
    if (result === null) res.status(404).json({ message: "Not Found" });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    handleHttp(res, "serverError");
  }
}

const deleteCategory = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    const delCateg = await categDelete(id);
    if (delCateg === null) res.status(404).json({ message: "Not Found" });
    res.status(200).json(delCateg);
  } catch (error) {
    console.log(error);
    handleHttp(res, "serverError");
  }
}

const getByIDCategory = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    const result = await categShowByID(id);
    if (result === null) res.status(404).json({ message: "Not items Found" });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    handleHttp(res, "serverError");
  }
}




export {
  postCategory,
  getCategory,
  putCategory,
  deleteCategory,
  getByIDCategory
}