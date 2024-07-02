import dotenv from 'dotenv';
dotenv.config();

import messageService from './services/messageService';
import fileStorageService from './services/fileStorageService';
import { parseDataChunk } from './services/parserService';
import { MongoDBAdapterImpl } from './adapters/mongodbAdapter';
import { Product } from './types/product';
import { ProductsDAO } from './dao/productsDAO';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

let productsDAO: ProductsDAO;

(async () => {
  const dbAdapter = await MongoDBAdapterImpl.getInstance(process.env.DB_HOST as string, process.env.DB_NAME as string);
  productsDAO = new ProductsDAO(dbAdapter);
})();

async function ingestionQueueOnMessage(content: string): Promise<void> {
  try {
    const { filename } = JSON.parse(content);

    console.log(`Processing file: ${filename}`);

    await fileStorageService.streamFile(filename, async (chunk: Product) => {
      await parseDataChunk(
        chunk,
        (data: any) => {
          return data; // TODO: Implement transform
        },
        async (transformedData: Product) => {
          console.log('Processed chunk:', transformedData);
          await sleep(10000);
          await productsDAO.insertProducts([transformedData]);
        }
      );
    });

    console.log('Data successfully written to MongoDB');
  } catch (error) {
    console.error('Error processing message:', error);
  }
}

(async () => {
  await messageService.consume('ingestion-queue', ingestionQueueOnMessage);
})();
