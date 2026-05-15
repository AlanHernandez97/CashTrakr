import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import { db } from '../src/config/db';
import BudgetRouter from './routes/BudgetRouter';
import authRouter from './routes/AuthRouter';

async function connectDB() {
	try {
		await db.authenticate();
		db.sync();
		console.log(colors.blue.bold('Conexión a la base de datos establecida'))
	} catch (error) {
		console.log(colors.red.bold('Error al conectar a la base de datos'))
	}
}

connectDB();

const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/budget', BudgetRouter);
app.use('/api/auth', authRouter)



export default app