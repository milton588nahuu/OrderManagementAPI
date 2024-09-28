import Router from 'express';
import {requiredScopes} from 'express-oauth2-jwt-bearer';
import {validateID} from '../middleware/id.validator'
import {shipperValidatorPartial} from '../middleware/partial.validator'
import {shipperValidator} from '../middleware/required.validatos'
import {
  deleteShipper,
  getByIDShipper,
  getShipper,
  postShipper,
  putShipper
} from '../controllers/shippers.controllers'

const router = Router();
/**
  * shippers
  */
router.get("/shipp",requiredScopes("read:admins"),getShipper);
router.get("/shipp/:id",requiredScopes("read:admins"),validateID,getByIDShipper);
router.post("/shipp",requiredScopes("write:admins"),shipperValidator,postShipper);
router.put("/shipp/:id",requiredScopes("write:admins"),validateID,shipperValidatorPartial, putShipper);
router.delete("/shipp/:id",requiredScopes("write:admins"),validateID,deleteShipper);

export {router}