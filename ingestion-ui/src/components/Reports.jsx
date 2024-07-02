import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getReports = async () => {
      try {
        const data = await apiService.fetchReports();
        setReports(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getReports();
  }, []);

  return (
    <div>
      <h2>Reports Page</h2>
      {error && <p>{error}</p>}
      <ul>
        {reports.map(report => (
          <li key={report.id}>
            <strong>Timestamp:</strong> {report.timestamp}<br />
            <strong>Description:</strong> {report.description}<br />
            <strong>Product IDs:</strong> {report.productIds.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
