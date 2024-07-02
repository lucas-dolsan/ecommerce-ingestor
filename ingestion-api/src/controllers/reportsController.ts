import { Request, Response } from 'express';
import { MongoDBAdapterImpl } from '../adapters/mongodbAdapter';
import { Report } from '../types/report';
import { ReportsDAO } from '../dao/reportsDAO';

let reportsDAO: ReportsDAO;

(async () => {
  const dbAdapter = await MongoDBAdapterImpl.getInstance(process.env.DB_HOST as string, process.env.DB_NAME as string);
  reportsDAO = new ReportsDAO(dbAdapter);
})();

const createReport = async (req: Request, res: Response) => {
  try {
    const report: Report = req.body;
    await reportsDAO.insertReport(report);
    res.status(201).send(report);
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getReportById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const report = await reportsDAO.getReportById(id);
    if (report) {
      res.status(200).send(report);
    } else {
      res.status(404).send('Report not found');
    }
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getAllReports = async (req: Request, res: Response) => {
  try {
    const reports = await reportsDAO.getAllReports();
    res.status(200).send(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).send('Internal Server Error');
  }
};

const updateReport = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const report: Partial<Report> = req.body;
    await reportsDAO.updateReport(id, report);
    res.status(200).send('Report updated successfully');
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).send('Internal Server Error');
  }
};

const deleteReport = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await reportsDAO.deleteReport(id);
    res.status(200).send('Report deleted successfully');
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).send('Internal Server Error');
  }
};

export default {
  createReport,
  getReportById,
  getAllReports,
  updateReport,
  deleteReport,
};
