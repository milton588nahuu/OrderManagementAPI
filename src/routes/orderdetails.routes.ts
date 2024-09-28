import Router from 'express';
import { requiredScopes } from 'express-oauth2-jwt-bearer';
import { validateID } from '../middleware/id.validator'
import { orderdetailValidatorPartial } from '../middleware/partial.validator'
import { orderdertailValidator } from '../middleware/required.validatos'
import {
    getOrdeDet, deleteOrdeDet,
    getByIDOrdeDet,
    postOrdeDet,
    putOrdeDet
} from '../../src/controllers/orderdetails.controllers';

const router = Router();
/**
* orderDertails
*/
router.get("/ord-det", requiredScopes("read:admins"), getOrdeDet);
router.post("/ord-det", requiredScopes("write:admins"), orderdertailValidator, postOrdeDet);
router.get("/ord-det/:id", requiredScopes("read:admins"), validateID, getByIDOrdeDet);
router.put("/ord-det/:id", requiredScopes("write:admins"), validateID, orderdetailValidatorPartial, putOrdeDet);
router.delete("/ord-det/:id", requiredScopes("write:admins"), validateID, deleteOrdeDet);

export { router }