import { CronJob } from 'cron';
import { ProductsRepository } from '../ports/productsRepository';
import { ReportsRepository } from '../ports/reportsRepository';
import { ObjectId } from 'mongodb';

const cronJobPattern = process.env.CRONJOB_PATTERN || '*/5 * * * *';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const createLowInventoryCronJob = (productsDAO: ProductsRepository, reportsDAO: ReportsRepository): CronJob => {
  return new CronJob(cronJobPattern, async () => {
    const products = await productsDAO.getAllProducts();
    const productsBelowThreshold = products.filter((p) => p.quantity < 5); // FIXME: one by one for now

    if (!productsBelowThreshold.length) {
      console.log('No products found with quantity less than 5');
      return;
    }

    const existingReport = await reportsDAO.getAllReports();
    await Promise.all(
      productsBelowThreshold.map(async (productBelowThreshold) => {
        const reportExists = existingReport.some(report => report.productIds.includes(productBelowThreshold.id));

        if (!reportExists) {
          const report = {
            id: new ObjectId().toString(),
            timestamp: new Date().toISOString(),
            description: `Product ${productBelowThreshold.name} is below threshold`,
            productIds: [productBelowThreshold.id],
          };
    
          await sleep(15000);

          await reportsDAO.insertReport(report);
          console.log(`Report created for product: ${productBelowThreshold.name}`);
        }
      })
    );
  });
};

export const startLowInventoryCronJob = (productsDAO: ProductsRepository, reportsDAO: ReportsRepository) => {
  const cronJob = createLowInventoryCronJob(productsDAO, reportsDAO);
  cronJob.start();
};

export default {
  startLowInventoryCronJob
}