import axios from 'axios';

export const fetchLakeData = async () => {
  try {
    const response = await axios.get('http://localhost/nckh-2024/back-end/Predict/get_Predict.php');
    const data = response.data;
    if (Array.isArray(data)) {
      const formattedData = data.map(item => ({
        time: item.time,
        waterLevel: parseFloat(item.level_m) || 0,
        temperature: parseFloat(item.temperature) || 0,
        humidity: parseFloat(item.humidity) || 0,
        pH: parseFloat(item.ph) || 0
      }));
      console.log('Formatted data:', formattedData); // Debug log
      return formattedData;
    }
    return [];
  } catch (error) {
    console.error('Error fetching lake data:', error);
    return [];
  }
};