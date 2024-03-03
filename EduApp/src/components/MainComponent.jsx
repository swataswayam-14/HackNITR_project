import React, { useState, useEffect } from 'react';
import DataComponent from './DataComponent'; // Assuming DataComponent is in a separate file

const MainComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://34.31.207.187:8080/emotionAttention?query=https://drive.google.com/file/d/11wmKq-OENPfunMIt72Kfojd0BUPGnH6b/view?usp=sharing ');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        setData(responseData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <DataComponent data={data} />}
    </div>
  );
};

export default MainComponent;
