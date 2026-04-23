import Router from 'express';
import { BudgetController } from '../controllers/BudgetController';
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import { validateBudgetExist, validateBudgetId, validateBudgetInput } from '../middleware/Budget';

const router = Router();

router.param('budgetId', validateBudgetId);
router.param('budgetId', validateBudgetExist);

router.get('/', BudgetController.getAll);
router.get('/:budgetId', BudgetController.getById);

router.post('/', validateBudgetInput, BudgetController.create);

router.put('/:budgetId', validateBudgetInput, BudgetController.updateById);

router.delete('/:budgetId', BudgetController.deleteById);


export default router;