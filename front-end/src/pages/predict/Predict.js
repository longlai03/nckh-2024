import React, { useState, useEffect } from 'react';
import LakeChart from './PredictTable.js';
import { fetchLakeData } from './api/getPredict.js';
import './Predict.css';

function App() {
  const [lakeData, setLakeData] = useState([]);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Fetch lake data
  useEffect(() => {
    const getData = async () => {
      const data = await fetchLakeData();
      setLakeData(data);
    };

    getData();
    const interval = setInterval(getData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <LakeChart lakeData={lakeData} windowSize={windowSize} />;
}

export default App;