import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'd3-format';

const RegionalIndicator = ({ data, region, year, indicator }) => {
  const chartData = data
    .filter(d => d.Region === region && +d.Year === year)
    .map(d => ({
      name: d.Country,
      value: +d[indicator]
    }))
    .sort((a, b) => b.value - a.value);

  const indicatorLabel = indicator.replace(/_/g, ' ');

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: indicatorLabel, angle: -90, position: 'insideLeft' }} />
        <Tooltip formatter={(value) => [`${value} %`, indicatorLabel]} />
        <Legend />
        <Bar dataKey="value" fill="#82ca9d" name={indicatorLabel} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RegionalIndicator;