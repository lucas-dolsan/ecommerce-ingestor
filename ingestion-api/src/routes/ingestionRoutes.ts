import { Router } from 'express';

import ingestionController from '../controllers/ingestionController';
import middlewares from '../middlewares';

const ingestionRouter = Router();

ingestionRouter.post('/upload', middlewares.fileUpload(), ingestionController.uploadFile);

export default ingestionRouter;
