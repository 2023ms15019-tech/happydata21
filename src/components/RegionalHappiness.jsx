import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'd3-format';

const RegionalHappiness = ({ data, year }) => {
  const regionalData = data
    .filter(d => +d.Year === year)
    .reduce((acc, current) => {
      const region = current.Region;
      if (!acc[region]) {
        acc[region] = [];
      }
      acc[region].push(+current.Happiness_Score);
      return acc;
    }, {});

  const chartData = Object.keys(regionalData).map(region => ({
    region: region,
    'Avg Happiness': regionalData[region].reduce((sum, val) => sum + val, 0) / regionalData[region].length
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const countriesInRegion = data.filter(d => d.Region === label && +d.Year === year);
      const sortedCountries = countriesInRegion.sort((a, b) => b.Happiness_Score - a.Happiness_Score);
      const topCountry = sortedCountries[0];
      const bottomCountry = sortedCountries[sortedCountries.length - 1];

      return (
        <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
          <p style={{ fontWeight: 'bold' }}>{`${label} - Avg Happiness: ${payload[0].value.toFixed(2)}`}</p>
          {topCountry && <p style={{ color: '#82ca9d' }}>{`Top Country: ${topCountry.Country} (${topCountry.Happiness_Score})`}</p>}
          {bottomCountry && <p style={{ color: '#ff7300' }}>{`Bottom Country: ${bottomCountry.Country} (${bottomCountry.Happiness_Score})`}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="region" />
        <YAxis label={{ value: 'Happiness Score', angle: -90, position: 'insideLeft' }} domain={[0, 10]} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="Avg Happiness" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RegionalHappiness;