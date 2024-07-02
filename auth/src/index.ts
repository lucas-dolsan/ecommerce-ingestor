import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import authRoutes from './routes/authRoutes';
import authService from './services/authService';
import middlewares from './middlewares';

authService.initialMigration();

const app = express();
const port = process.env.PORT

app.use(middlewares.jsonParser());
app.use(middlewares.enableCors());

app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Auth service is running on port ${port}`);
});
