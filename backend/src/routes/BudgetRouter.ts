import Router from 'express';
import { BudgetController } from '../controllers/BudgetController';
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import { validateBudgetExist, validateBudgetId, validateBudgetInput } from '../middleware/Budget';
import { ExpensesController } from '../controllers/ExpenseController';

const router = Router();

router.param('budgetId', validateBudgetId);
router.param('budgetId', validateBudgetExist);

router.get('/', BudgetController.getAll);
router.get('/:budgetId', BudgetController.getById);

router.post('/', validateBudgetInput, BudgetController.create);

router.put('/:budgetId', validateBudgetInput, BudgetController.updateById);

router.delete('/:budgetId', BudgetController.deleteById);


// Routes for Expenses
router.get('/:budgetId/expenses', ExpensesController.getAll)
router.post('/:budgetId/expenses', ExpensesController.create)
router.get('/:budgetId/expenses/:expenseId', ExpensesController.getById)
router.put('/:budgetId/expenses/:expenseId', ExpensesController.updateById)
router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById)

export default router;