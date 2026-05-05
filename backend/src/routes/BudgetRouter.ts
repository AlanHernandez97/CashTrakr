import Router from 'express';
import { BudgetController } from '../controllers/BudgetController';
import { validateBudgetExist, validateBudgetId, validateBudgetInput } from '../middleware/Budget';
import { ExpensesController } from '../controllers/ExpenseController';
import { validateExpenseExist, validateExpenseId, validateExpenseInput } from '../middleware/Expense';
import { handleInputErrors } from '../middleware/validation';

const router = Router();

router.param('budgetId', validateBudgetId);
router.param('budgetId', validateBudgetExist);

router.param('expenseId', validateExpenseId);
router.param('expenseId', validateExpenseExist);

router.get('/', BudgetController.getAll);
router.get('/:budgetId', BudgetController.getById);

router.post('/', validateBudgetInput, BudgetController.create);

router.put('/:budgetId', validateBudgetInput, BudgetController.updateById);

router.delete('/:budgetId', BudgetController.deleteById);


// Routes for Expenses
router.post('/:budgetId/expenses', validateExpenseInput, handleInputErrors, ExpensesController.create)
router.get('/:budgetId/expenses/:expenseId', ExpensesController.getById)
router.put('/:budgetId/expenses/:expenseId', validateExpenseInput, handleInputErrors, ExpensesController.updateById)
router.delete('/:budgetId/expenses/:expenseId', validateExpenseInput, handleInputErrors, ExpensesController.deleteById)

export default router;