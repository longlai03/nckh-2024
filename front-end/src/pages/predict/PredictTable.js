import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './Predict.css';

const LakeChart = ({ lakeData, windowSize }) => {
  const chartWidth = Math.max(windowSize.width * 0.65, lakeData.length * 50);
  const chartHeight = windowSize.height * 0.75;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dự đoán độ ẩm, nhiệt độ </h1>
      <div className="dashboard-content">
        {/* Chart Section */}
        <div className="chart-container">
          <div style={{ width: `${chartWidth}px`, height: '100%' }}>
            <LineChart
              width={chartWidth}
              height={chartHeight}
              data={lakeData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis 
                dataKey="time" 
                tick={{ fill: '#666', fontSize: 12 }}
                interval={Math.floor(lakeData.length / 10)}
                height={60}
              />
              <YAxis 
                tick={{ fill: '#666', fontSize: 12 }}
                domain={['auto', 'auto']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  borderRadius: '5px',
                  border: 'none',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: '20px',
                  fontSize: '14px',
                  color: '#444'
                }}
              />
              <Line
                type="monotone"
                dataKey="waterLevel"
                stroke="#36a2eb"
                strokeWidth={2}
                name="Water Level (m)"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#ff6384"
                strokeWidth={2}
                name="Temperature (°C)"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#4bc0c0"
                strokeWidth={2}
                name="Humidity (%)"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="pH"
                stroke="#9966ff"
                strokeWidth={2}
                name="pH"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Latest Data Section */}
          <div className="card latest-data">
            <h3 className="card-title">Latest Measurements</h3>
            {lakeData.length > 0 ? (
              <div className="data-list">
                <p className="data-item water-level">
                  <strong>Water Level:</strong> {lakeData[lakeData.length - 1].waterLevel} m
                </p>
                <p className="data-item temperature">
                  <strong>Temperature:</strong> {lakeData[lakeData.length - 1].temperature} °C
                </p>
                <p className="data-item humidity">
                  <strong>Humidity:</strong> {lakeData[lakeData.length - 1].humidity} %
                </p>
                <p className="data-item ph">
                  <strong>pH:</strong> {lakeData[lakeData.length - 1].pH}
                </p>
                <p className="data-item time">
                  <strong>Time:</strong> {lakeData[lakeData.length - 1].time}
                </p>
              </div>
            ) : (
              <p className="no-data">No data available</p>
            )}
          </div>

          {/* Data Table Section */}
          <div className="card data-table">
            <h3 className="card-title">Predict History</h3>
            {lakeData.length > 0 ? (
              <div className="table-wrapper">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Level (m)</th>
                      <th>Temp (°C)</th>
                      <th>Hum (%)</th>
                      <th>pH</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lakeData.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                        <td>{item.time}</td>
                        <td className="water-level">{item.waterLevel}</td>
                        <td className="temperature">{item.temperature}</td>
                        <td className="humidity">{item.humidity}</td>
                        <td className="ph">{item.pH}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="no-data">No monitoring data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LakeChart;