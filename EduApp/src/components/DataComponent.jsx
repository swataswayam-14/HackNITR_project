import React from 'react';

const DataComponent = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Time Range</th>
          <th>Is Neutral?</th>
          <th>Response</th>
        </tr>
      </thead>
      <tbody>
        {data.prediction.map(([timestamp, isNeutral, response], index) => (
          <tr key={index}>
            <td>{getTimeRange(timestamp)}</td>
            <td>{isNeutral === "neutral" ? "Yes" : "No"}</td>
            <td>{response}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const getTimeRange = (timestamp) => {
  const timestampNumber = parseInt(timestamp.split('_')[1]);
  const start = (timestampNumber - 1) * 30;
  const end = timestampNumber * 30;
  return `(${start}-${end})`;
};

export default DataComponent;
