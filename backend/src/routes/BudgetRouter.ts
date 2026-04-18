import Router from 'express';
import { BudgetController } from '../controllers/BudgetController';
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';

const router = Router();

router.get('/', BudgetController.getAll);
router.get('/:id', BudgetController.getById);
router.post('/',
	body("name")
		.notEmpty()
		.withMessage("El nombre es obligatorio"),
	body("amount")
		.notEmpty().withMessage("El monto es obligatorio")
		.isNumeric().withMessage("El monto debe ser un número")
		.custom((value) => value > 0).withMessage("El monto debe ser mayor a cero"),
	handleInputErrors,
	BudgetController.create);
router.put('/:id',
	param("id")
		.isInt().withMessage("El ID no es válido")
		.custom((value) => value > 0).withMessage("El ID debe ser mayor a cero"),
	handleInputErrors,
	BudgetController.updateById);
router.delete('/:id', BudgetController.deleteById);


export default router;