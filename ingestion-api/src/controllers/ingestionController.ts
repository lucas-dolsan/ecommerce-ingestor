import { Request, Response } from 'express';
import path from 'path';
import messageService from '../services/messageService';

const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const filename = req.file.filename;
    const filePath = path.join('/app/data', filename);

    console.log(`File uploaded: ${filePath}`)
    
    await messageService.sendMessage('ingestion-queue', JSON.stringify({ filename }));
    res.status(200).send(filePath);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Internal Server Error');
  }
};

export default { uploadFile };
