import { Router } from 'express';
import reportsController from '../controllers/reportsController';

const reportRouter = Router();

reportRouter.post('/', reportsController.createReport);
reportRouter.get('/:id', reportsController.getReportById);
reportRouter.get('/', reportsController.getAllReports);
reportRouter.put('/:id', reportsController.updateReport);
reportRouter.delete('/:id', reportsController.deleteReport);

export default reportRouter;
