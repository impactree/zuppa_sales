/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './AnalyticsTable.css';

interface TableColumn {
  key: string;
  label: string;
}

interface AnalyticsTableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
  title: string;
}

export default function AnalyticsTable({
  columns,
  data,
  title,
}: AnalyticsTableProps) {
  return (
    <div className="table-responsive mb-3">
      <h6 style={{ color: '#2B3674' }} className="fs-14 fw-700 mb-0">
        {title}
      </h6>
      <div className="mt-3">
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={`table ${row}`}>
                {columns.map((col) => (
                  <td key={col.key}>{row[col.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
