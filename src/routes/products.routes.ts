import Router from 'express';
import { requiredScopes } from 'express-oauth2-jwt-bearer';
import {validateID} from '../middleware/id.validator'
import {productValidator} from '../middleware/required.validatos'
import {productValidatorPartial} from '../middleware/partial.validator'
import {
    deleteProd,
    getByIDProd,
    getProd,
    postProd,
    putProd
} from '../controllers/products.controllers'

const router = Router();

/**
 * products ...
 */
router.get("/prod",requiredScopes("read:admins"),getProd);
router.post("/prod",requiredScopes("write:admins"),productValidator,postProd);
router.get("/prod/:id",requiredScopes("read:admins"),validateID,getByIDProd);
router.put("/prod/:id",requiredScopes("write:admins"),validateID,productValidatorPartial, putProd);
router.delete("/prod/:id",requiredScopes("write:admins"),validateID,deleteProd);


export {router}