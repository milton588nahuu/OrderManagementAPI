import Router from 'express';
import { requiredScopes } from 'express-oauth2-jwt-bearer';
import { orderValidator } from '../middleware/required.validatos'
import { orderValidatorPartial } from '../middleware/partial.validator'
import { validateID } from '../middleware/id.validator'
import { deleteOrder, 
    getByIDOrder, 
    getOrder,
    postOrder, 
    putOrder 
} from '../controllers/orders.controllers'

const router = Router();
/**
 * orders
 */
router.get("/ord",requiredScopes("read:admins"),getOrder);
router.post("/ord",requiredScopes("write:admins"),orderValidator, postOrder);
router.get("/ord/:id",requiredScopes("read:admins"),validateID, getByIDOrder);
router.put("/ord/:id",requiredScopes("write:admins"),validateID, orderValidatorPartial, putOrder);
router.delete("/ord/:id",requiredScopes("write:admins"),validateID, deleteOrder);


export { router }