// Function to fetch World Bank data for a specific indicator and country
export async function fetchWorldBankData(indicatorCode, countryCode) {
  const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicatorCode}?date=2000:2023&format=json`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // The World Bank API returns an array, with the second element containing the data
    return data[1];
  } catch (error) {
    console.error("Error fetching World Bank data:", error);
    return null;
  }
}

// Function to simulate fetching happiness data.
// In a real application, you would replace this with an actual API call
// or a file hosted on your server.
export async function fetchHappinessData() {
  // This is a static mock data set for demonstration purposes.
  // The structure is designed to match the format needed for a line chart.
  const mockData = [
    { year: 2000, happiness: 5.5, gdp: 5000 },
    { year: 2005, happiness: 5.8, gdp: 6500 },
    { year: 2010, happiness: 6.1, gdp: 8000 },
    { year: 2015, happiness: 6.4, gdp: 9500 },
    { year: 2020, happiness: 6.2, gdp: 10500 },
    { year: 2022, happiness: 6.3, gdp: 11000 },
  ];
  return new Promise(resolve => setTimeout(() => resolve(mockData), 500));
}