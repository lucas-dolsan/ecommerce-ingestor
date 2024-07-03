import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import middlewares from './middlewares';
import productRouter from './routes/productRoutes';
import ingestionRouter from './routes/ingestionRoutes';
import reportRouter from './routes/reportRoutes';

const app = express();
const port = process.env.PORT;

app.use(middlewares.enableCors());
app.use(middlewares.jsonParser());
app.use('/api/products', middlewares.auth(), productRouter);
app.use('/api/reports', middlewares.auth(), reportRouter);
app.use('/api/ingestion', middlewares.auth(), ingestionRouter);


// test 1
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
