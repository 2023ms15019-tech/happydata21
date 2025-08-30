import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HappinessVsIndicator = ({ data, country }) => {
  const filteredData = data.filter(d => d.Country === country).map(d => ({
    Year: +d.Year,
    Happiness_Score: +d.Happiness_Score,
    Poverty_Rate: +d.Poverty_Rate,
    CO2_Emissions: +d.CO2_Emissions,
    Education_Index: +d.Education_Index
  }));

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Happiness vs. Poverty Rate & Education Index</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year" />
          <YAxis yAxisId="left" label={{ value: 'Happiness Score', angle: -90, position: 'insideLeft' }} domain={[4, 7]} />
          <YAxis yAxisId="right" orientation="right" label={{ value: 'Value', angle: 90, position: 'insideRight' }} />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="Happiness_Score" stroke="#ffc658" name="Happiness Score" />
          <Line yAxisId="right" type="monotone" dataKey="Poverty_Rate" stroke="#ff7300" name="Poverty Rate (%)" />
          <Line yAxisId="right" type="monotone" dataKey="Education_Index" stroke="#387999" name="Education Index" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HappinessVsIndicator;