import Router from 'express';
import { validateID } from '../../src/middleware/id.validator';
import { employeeValidator } from '../middleware/required.validatos';
import {employeeValidatorPartial} from '../middleware/partial.validator';
import { requiredScopes } from 'express-oauth2-jwt-bearer';
import { 
    getEmployee,
    deleteEmployee,
    getByIDEmployee,
    postEmployee,
    putEmployee
} from '../../src/controllers/employees.controllers';

const router = Router();
/**
 * employees
 */
router.get("/empl",requiredScopes("read:admins"),getEmployee);
router.get("/empl/:id",requiredScopes("read:admins"),validateID,getByIDEmployee);
router.post("/empl",requiredScopes("write:admins"),employeeValidator,postEmployee);
router.put("/empl/:id",requiredScopes("write:admins"),validateID,employeeValidatorPartial,putEmployee);
router.delete("/empl/:id",requiredScopes("write:admins"),validateID,deleteEmployee);
export {router}