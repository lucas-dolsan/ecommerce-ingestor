import { MongoDBAdapterImpl } from './adapters/mongodbAdapter';
import { ProductsDAO } from './dao/productsDAO';
import { ReportsDAO } from './dao/reportsDAO';
import cronjobService from './services/cronjobService';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  const dbAdapter = await MongoDBAdapterImpl.getInstance(process.env.DB_HOST as string, process.env.DB_NAME as string);
  const productsDAO = new ProductsDAO(dbAdapter);
  const reportsDAO = new ReportsDAO(dbAdapter);

  cronjobService.startLowInventoryCronJob(productsDAO, reportsDAO);
})();
