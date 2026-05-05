import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import Budget from "../models/Budget";

declare global {
	namespace Express {
		interface Request {
			budget?: Budget
		}
	}
}

export const validateBudgetId = async (req: Request, res: Response, next: NextFunction) => {
	await param("budgetId")
		.isInt().withMessage("El ID no es válido").custom((value) => value > 0).withMessage("El ID debe ser mayor a cero").run(req)
	let errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	next();
}

export const validateBudgetExist = async (req: Request, res: Response, next: NextFunction) => {

	try {
		const { budgetId } = req.params;
		if (Array.isArray(budgetId)) {
			return res.status(400).json({ error: 'ID inválido' });
		}
		const budget = await Budget.findByPk(budgetId);
		if (!budget) {
			return res.status(404).json({ error: 'Presupuesto no encontrado' });
		}
		req.budget = budget;
		next();
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener el presupuesto' });
	}
}

export const validateBudgetInput = async (req: Request, res: Response, next: NextFunction) => {

	await body("name").notEmpty().withMessage("El nombre es obligatorio").run(req)
	await body("amount").notEmpty().withMessage("El monto es obligatorio").isNumeric().withMessage("El monto debe ser un número").custom((value) => value > 0).withMessage("El monto debe ser mayor a cero").run(req)
	let errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}



	next();
}
