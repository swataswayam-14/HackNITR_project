import React, { useState, useEffect } from 'react';

function DataDisplayComponent() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('http://34.31.207.187:8080/emotionAttention?query=https://drive.google.com/file/d/11wmKq-OENPfunMIt72Kfojd0BUPGnH6b/view?usp=sharing');
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const jsonData = await response.json();
        if (jsonData.status !== 'success') {
          throw new Error('Backend response status is not "success"');
        }

        setData(processResponseData(jsonData.prediction));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const processResponseData = (predictionData) => {
    // Process the response data as needed, e.g.,
    // - Extract relevant information (timestamps, emotion, flag)
    // - Format the data for display (e.g., convert timestamps, handle missing emotions)
    return predictionData.map((row) => ({
      timestamp: row[0][0],
      emotion: row[1][0] === -1 ? 'Not Available' : row[1][0],
      flag: row[2][0],
    }));
  };

  return (
    <div>
      {isLoading && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Emotion</th>
              <th>Flag</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.timestamp}>
                <td>{item.timestamp}</td>
                <td>{item.emotion}</td>
                <td>{item.flag}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!isLoading && !error && data.length === 0 && <p>No data available.</p>}
    </div>
  );
}

export default DataDisplayComponent;
