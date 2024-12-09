import React from "react";
import ReactDOM from "react-dom/client";
import { Box, Grid, Typography, Card, CardContent, Button } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
const Dashboard = () => {
    const data = [
        { name: "2024-11-10 23:22:07", Temperature: 450, Humidity: 550, Pressure: 1012,  },
        { name: "2024-11-10 23:27:10", Temperature: 750, Humidity: 300, Pressure: 600 },
        { name: "2024-11-10 23:32:07", Temperature: 1000, Humidity: 800, Pressure: 903 },
        { name: "2024-11-10 23:37:07", Temperature: 600, Humidity: 500, Pressure: 200 },
    ];
    
    return (
        <Box sx={{ p: 4 }}>
    
          {/* Main Content */}
          <Grid container spacing={4}>
            {/* Live Temperature & Humidity */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent> 
                  <Typography variant="h6">Live Temperature</Typography>
                  <Typography>Max: 50.5 °C - 2024-12-11 17:09:09</Typography>    
                  <Typography>Min: 0 °C - 2024-11-10 09:09:41</Typography>
                  <Typography>Average: 25.25 °C - Today</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Live Humidity</Typography>  
                  <Typography>Max: 45.5 °C - 2024-12-11 17:09:09</Typography              >
                  <Typography>Min: 0.5 °C - 2024-11-10 09:09:41</Typography>
                  <Typography>Average: 25.25 °C - Today</Typography>
                </CardContent>
              </Card>
            </Grid>
    
            {/* Chart */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Temperature & Humidity</Typography>
                  <BarChart width={600} height={300} data={data}>    
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Temperature" fill="#8884d8" />  
                    <Bar dataKey="Humidity" fill="#82ca9d" />
                    <Bar dataKey="Pressure" fill="#FF0000" />  
                  </BarChart>
                </CardContent>
              </Card>
            </Grid>
    
            {/* Temperature & Humidity Widgets */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Temperature</Typography>
                  <Typography variant="h4" color="primary">4.50 °C</Typography>
                  <Typography variant="body2">2024-11-10 23:22:07</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Humidity</Typography>
                  <Typography variant="h4" color="secondary">55.5 %</Typography>
                  <Typography variant="body2">2024-11-10 23:22:07</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
    );
};
export default Dashboard;