import fs from 'fs';
import path from 'path';
import { parser } from 'stream-json';
import { streamArray } from 'stream-json/streamers/StreamArray';
import { chain } from 'stream-chain';

async function streamFile(filename: string, onChunk: (chunk: any) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    const filePath = path.join('/app/data', filename);
    console.log(`Checking if file exists at path: ${filePath}`);

    if (!fs.existsSync(filePath)) {
      return reject(new Error(`File not found: ${filePath}`));
    }

    const pipeline = chain([
      fs.createReadStream(filePath),
      parser(),
      streamArray()
    ]);

    pipeline.on('data', ({ value }) => {
      onChunk(value);
    });

    pipeline.on('end', () => {
      console.log('File streaming complete');
      resolve();
    });

    pipeline.on('error', (error) => {
      console.error('Error reading file:', error);
      reject(error);
    });
  });
}

export default {
  streamFile
}