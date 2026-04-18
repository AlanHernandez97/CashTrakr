import { Request, Response } from 'express';
import Budget from '../models/Budget';

export class BudgetController {
	static getAll = async (req: Request, res: Response) => {
		try {
			const budget = await Budget.findAll({
				order: [['createdAt', 'DESC']] // Ordenar por fecha de creación, el más reciente primero
				//TODO: Filtrar por usuario autenticado
			});
			res.status(200).json(budget);
		} catch (err) {
			res.status(500).json({ error: 'Error al obtener los presupuestos' });
		}
	}
	static create = async (req: Request, res: Response) => {
		try {
			const budget = new Budget(req.body);
			await budget.save();
			res.status(201).json("Presupuesto creado exitosamente"); //status 201 indica que se ha creado un recurso
			console.log(req.body)
		} catch (error) {
			//console.error('Error al crear el presupuesto:', error);
			res.status(500).json({ error: 'Error al crear el presupuesto' });
		}
	}
	static getById = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			if (Array.isArray(id)) {
				return res.status(400).json({ error: 'ID inválido' });
			}
			const budget = await Budget.findByPk(id);
			if (!budget) {
				return res.status(404).json({ error: 'Presupuesto no encontrado' });
			}
			res.status(200).json(budget);
		} catch (error) {
			res.status(500).json({ error: 'Error al obtener el presupuesto' });
		}
	}
	static updateById = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			if (Array.isArray(id)) {
				return res.status(400).json({ error: 'ID inválido' });
			}
			const budget = await Budget.findByPk(id);
			if (!budget) {
				return res.status(404).json({ error: 'Presupuesto no encontrado' });
			}
			//Escribir los nuevos valores en el presupuesto encontrado
			await budget.update(req.body)

			res.status(200).json("Presupuesto actualizado exitosamente");

		} catch (error) {
			res.status(500).json({ error: 'Error al obtener el presupuesto' });
		}
	}
	static deleteById = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			if (Array.isArray(id)) {
				return res.status(400).json({ error: 'ID inválido' });
			}
			const budget = await Budget.findByPk(id);
			if (!budget) {
				return res.status(404).json({ error: 'Presupuesto no encontrado' });
			}
			await budget.destroy();
			res.status(204).json("Presupuesto eliminado exitosamente"); //status 204 indica que la solicitud se ha procesado correctamente pero no hay contenido para devolver
		} catch (error) {
			res.status(500).json({ error: 'Error al eliminar el presupuesto' });
		}
	}
}