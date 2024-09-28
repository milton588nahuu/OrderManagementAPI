
import {
  Request,
  Response
} from 'express'
import {
  empCreator,
  empShow,
  empDelete,
  empShowByID,
  empUpdate
} from '../services/employees.service';
import {
  Employees
} from '../interfaces/Northwin';
import { empFilter } from '../services/filters.service';
import handleHttp from '../handlers/errors.controllers';
import { isExistEmpl } from '../helpers/helpers';

const postEmployee = async (req: Request, res: Response) => {
  try {
    const {
      employeeID,
      firstName,
      lastName,
      birthdate,
      photo,
      notes
    } = req.body;
    const newData: Employees = {
      employeeID,
      firstName,
      lastName,
      birthdate,
      photo,
      notes
    }
    console.log(newData);
    const existsField = await isExistEmpl(newData);
    if (existsField.value) {
      res.status(202);
      res.json({"msg":`the ${existsField.field} field exists`});
    } else {
      const result = await empCreator(newData);
      res.status(201).json(result);
    }
  } catch (error) {
    console.log(error);
    handleHttp(res, "serverError");
  }
}

const getEmployee = async (req: Request, res: Response) => {
  try {
    const results = await empShow();
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    handleHttp(res, "serverError");
  }
}

const putEmployee = async (req: Request<{ id: string }, Employees>, res: Response) => {
  try {
    const id = req.params.id;
    const {
      employeeID,
      firstName,
      lastName,
      birthdate,
      photo,
      notes
    } = req.body;
    const updata: Employees = {
      employeeID,
      firstName,
      lastName,
      birthdate,
      photo,
      notes
    }
    const result = await empUpdate(id, updata);
    if (result === null) res.status(404).json({ message: "Not Found" });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    handleHttp(res, "serverError");
  }
}

const deleteEmployee = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    const delEmpl = await empDelete(id);
    if(delEmpl === null) res.status(404).json({ message: "Not Found" }); 
    res.status(200).json(delEmpl);
  } catch (error) {
    console.error(error);
    handleHttp(res, "serverError");
  }
}

const getByIDEmployee = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    const result = await empShowByID(id);
    if (result === null) res.status(404).json({ message: "Not items Found" });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    handleHttp(res, "serverError");
  }
}

const getEmployeesFilter = async (req: Request, res: Response) => {
  try {
    const queryString = JSON.stringify(req.query);
    const queryObject = JSON.parse(queryString);
    const {
      employeeID,
      firstName,
      lastName,
      birthdate,
      photo,
      notes
    } = queryObject;
    const newQuery: Employees = {
      employeeID,
      firstName,
      lastName,
      birthdate,
      photo,
      notes
    }
    const resQuery = await empFilter(newQuery);
    if (!resQuery) {
      res.status(404).json({ message: `No items found` });
    }
    console.log(resQuery);
    res.status(200).json({ "result": resQuery });
  } catch (error) {
    console.error(error);
    handleHttp(res, "serverError");
  }
}

export {
  postEmployee,
  getEmployee,
  putEmployee,
  deleteEmployee,
  getByIDEmployee,
  getEmployeesFilter
}