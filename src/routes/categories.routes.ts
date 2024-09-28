import Router from 'express';
import { requiredScopes } from 'express-oauth2-jwt-bearer';
import { validateID } from '../middleware/id.validator';
import { categoryValidatorPartial } from '../middleware/partial.validator';
import { categoryValidator } from '../middleware/required.validatos'
import {
    deleteCategory,
    getByIDCategory,
    getCategory,
    postCategory,
    putCategory
  
} from '../controllers/categories.controllers';
const router = Router();
/**
 * categories
 */
router.get("/categ",requiredScopes("read:admins"),getCategory);
router.post("/categ",requiredScopes("write:admins"),categoryValidator,postCategory);
router.get("/categ/:id",requiredScopes("read:admins"),validateID,getByIDCategory);
router.put("/categ/:id",requiredScopes("read:admins"),validateID,categoryValidatorPartial,putCategory);
router.delete("/categ/:id",requiredScopes("read:admins"),validateID,deleteCategory);


export { router };


