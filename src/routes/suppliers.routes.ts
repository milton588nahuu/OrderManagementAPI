import Router from 'express';
import { requiredScopes } from 'express-oauth2-jwt-bearer';
import { validateID } from '../middleware/id.validator';
import { supplierValidator } from '../middleware/required.validatos';
import { supplierValidatorPartial } from '../middleware/partial.validator';
import {
    deleteSupplier,
    getByIDSupplier,
    getSupplier,
    postSupplier,
    putSupplier
} from '../controllers/suppliers.controllers';

const router = Router();
/*
 * suppliers
 */
router.get("/supp",requiredScopes("read:admins"),getSupplier);
router.get("/supp/:id",requiredScopes("read:admins"),validateID, getByIDSupplier);
router.post("/supp",requiredScopes("write:admins"),supplierValidator,postSupplier);
router.put("/supp/:id",requiredScopes("write:admins"),validateID, supplierValidatorPartial, putSupplier);
router.delete("/supp/:id",requiredScopes("write:admins"),validateID, deleteSupplier);

export { router }