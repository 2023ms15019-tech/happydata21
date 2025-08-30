import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CountryTrends = ({ data, country }) => {
  const filteredData = data.filter(d => d.Country === country).map(d => ({
    Year: +d.Year,
    GDP_per_Capita: +d.GDP_per_Capita,
    Literacy_Rate: +d.Literacy_Rate
  }));

  // Tooltip for min/max/average
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const gdpData = filteredData.map(d => d.GDP_per_Capita);
      const minGDP = Math.min(...gdpData);
      const maxGDP = Math.max(...gdpData);
      const avgGDP = (gdpData.reduce((sum, val) => sum + val, 0) / gdpData.length).toFixed(2);
      
      return (
        <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
          <p style={{ fontWeight: 'bold' }}>{`Year: ${label}`}</p>
          {payload.map((p, index) => (
            <p key={index} style={{ color: p.stroke }}>{`${p.name}: $${p.value}`}</p>
          ))}
          <hr />
          <p>Avg GDP: ${avgGDP}</p>
          <p>Min GDP: ${minGDP}</p>
          <p>Max GDP: ${maxGDP}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>GDP per Capita & Literacy Rate over Time</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year" />
          <YAxis yAxisId="left" label={{ value: 'GDP per Capita ($)', angle: -90, position: 'insideLeft' }} />
          <YAxis yAxisId="right" orientation="right" label={{ value: 'Literacy Rate (%)', angle: 90, position: 'insideRight' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="GDP_per_Capita" stroke="#8884d8" name="GDP per Capita" />
          <Line yAxisId="right" type="monotone" dataKey="Literacy_Rate" stroke="#82ca9d" name="Literacy Rate" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CountryTrends;