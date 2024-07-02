import { Report } from '../types/report';

export interface ReportsRepository {
  insertReport(report: Report): Promise<void>;
  getReportById(id: string): Promise<Report | null>;
  getAllReports(): Promise<Report[]>;
  updateReport(id: string, report: Partial<Report>): Promise<void>;
  deleteReport(id: string): Promise<void>;
}
