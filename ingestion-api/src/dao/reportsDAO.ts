import { DatabaseAdapter } from '../adapters/mongodbAdapter';
import { ReportsRepository } from '../ports/reportsRepository';
import { Report } from '../types/report';
import { ObjectId } from 'mongodb';

export class ReportsDAO implements ReportsRepository {
  private dbAdapter: DatabaseAdapter;
  private collectionName = 'reports';

  constructor(dbAdapter: DatabaseAdapter) {
    this.dbAdapter = dbAdapter;
  }

  async insertReport(report: Report): Promise<void> {
    const db = this.dbAdapter.getDb();
    const collection = db.collection(this.collectionName);
    await collection.insertOne(this.mapReportToDocument(report));
  }

  async getReportById(id: string): Promise<Report | null> {
    const db = this.dbAdapter.getDb();
    const collection = db.collection(this.collectionName);
    const report = await collection.findOne({ _id: new ObjectId(id) });
    return report ? this.mapDocumentToReport(report) : null;
  }

  async getAllReports(): Promise<Report[]> {
    const db = this.dbAdapter.getDb();
    const collection = db.collection(this.collectionName);
    const reports = await collection.find({}).toArray();
    return reports.map(this.mapDocumentToReport);
  }

  async updateReport(id: string, report: Partial<Report>): Promise<void> {
    const db = this.dbAdapter.getDb();
    const collection = db.collection(this.collectionName);
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: report });
  }

  async deleteReport(id: string): Promise<void> {
    const db = this.dbAdapter.getDb();
    const collection = db.collection(this.collectionName);
    await collection.deleteOne({ _id: new ObjectId(id) });
  }

  private mapDocumentToReport(document: any): Report {
    return {
      id: document._id.toString(),
      timestamp: document.timestamp,
      description: document.description,
      productIds: document.productIds,
    };
  }

  private mapReportToDocument(report: Report): any {
    return {
      _id: new ObjectId(report.id),
      timestamp: report.timestamp,
      description: report.description,
      productIds: report.productIds,
    };
  }
}
