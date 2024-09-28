import {Router} from 'express'
import { requiredScopes } from "express-oauth2-jwt-bearer";
import { validateID } from "../../src/middleware/id.validator";
import { putCustomer ,
    deleteCustomer,
    getByIDCustomer,
    postCustomer, 
    getCustomer
} from "../../src/controllers/customers.controllers";

const router = Router();
/**
 * customers
 */
router.get("/cust",requiredScopes("read:admins"),getCustomer);
router.get("/cust/:id",requiredScopes("read:admins"),validateID,getByIDCustomer);
router.post("/cust",requiredScopes("write:admins"),postCustomer);
router.put("/cust/:id",requiredScopes("write:admins"),validateID,putCustomer);
router.delete("/cust/:id",requiredScopes("write:admins"),validateID,deleteCustomer);


export {router};