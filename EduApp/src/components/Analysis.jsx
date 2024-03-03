import React, { useState, useEffect } from 'react';

const Analysis = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://34.31.207.187:8080/emotionAttention?query=https://drive.google.com/file/d/11wmKq-OENPfunMIt72Kfojd0BUPGnH6b/view?usp=sharing ');
            const result = await response.json();
            console.log(result);
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Hardcoded timestamps
    const timestamps = Array.from({ length: 100 }, (_, index) => ({
        range: `(${index * 180}-${(index + 1) * 180})`,
        yesNo: data[index]?.yesNo || '',
        emotionState: data[index]?.emotionState || '',
    }));

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Yes/No</th>
                        <th>Emotion State</th>
                    </tr>
                </thead>
                <tbody>
                    {timestamps.map((timestamp, index) => (
                        <tr key={index}>
                            <td>{timestamp.range}</td>
                            <td>{data[index]?.yesNo || ''}</td>
                            <td>{data[index]?.emotionState || ''}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Analysis