import React from 'react';
import { csvParse as csv } from 'd3-dsv';
import { useState, useEffect } from 'react';

import CountryTrends from './components/CountryTrends';
import HappinessVsIndicator from './components/HappinessVsIndicator';
import RegionalHappiness from './components/RegionalHappiness';
import RegionalIndicator from './components/RegionalIndicator';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch and parse the CSV data
    const fetchData = async () => {
      try {
        const response = await fetch('/dashboard_data.csv');
        const text = await response.text();
        const parsedData = csv(text);
        setData(parsedData);
      } catch (error) {
        console.error("Error fetching or parsing data:", error);
      }
    };
    fetchData();
  }, []);

  if (data.length === 0) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading dashboard data...</div>;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: 'auto', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#0056b3' }}>Global Development Dashboard 🌍</h1>
        <p>Explore trends, correlations, and regional comparisons.</p>
      </header>
      
      {/* EPIC 1: Country-Trend */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ borderBottom: '2px solid #0056b3', paddingBottom: '10px' }}>Country Trends: India 🇮🇳</h2>
        <CountryTrends data={data} country="India" />
      </section>

      {/* EPIC 2: Indicator vs. Happiness Comparison */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ borderBottom: '2px solid #0056b3', paddingBottom: '10px' }}>Happiness Correlations</h2>
        <HappinessVsIndicator data={data} country="India" />
      </section>

      {/* EPIC 3: Regional Happiness Distribution */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ borderBottom: '2px solid #0056b3', paddingBottom: '10px' }}>Regional Happiness Scores (2023)</h2>
        <RegionalHappiness data={data} year={2023} />
      </section>

      {/* EPIC 4: Regional Indicator Snapshot */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ borderBottom: '2px solid #0056b3', paddingBottom: '10px' }}>Unemployment Rate in South Asia (2023)</h2>
        <RegionalIndicator data={data} region="South Asia" year={2023} indicator="Unemployment_Rate" />
      </section>
      
    </div>
  );
}

export default App;