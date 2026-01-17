export const countryData = {
  india: {
    name: 'India',
    color: '#FF9933',
    population: {
      2018: 1352642280,
      2019: 1366417754,
      2020: 1380004385,
      2021: 1393409038,
      2022: 1406631776,
      2023: 1428627663,
      2024: 1441719815
    },
    gdp: {
      2018: 2706.29,
      2019: 2836.68,
      2020: 2660.23,
      2021: 3173.4,
      2022: 3385.08,
      2023: 3549.92,
      2024: 3732.92
    },
    gdpPerCapita: {
      2018: 2001,
      2019: 2080,
      2020: 1928,
      2021: 2280,
      2022: 2409,
      2023: 2490,
      2024: 2592
    },
    growthRate: {
      2018: 6.45,
      2019: 3.87,
      2020: -5.83,
      2021: 9.05,
      2022: 7.24,
      2023: 7.2,
      2024: 7.5
    },
    literacy: 77.7,
    lifeExpectancy: 70.8,
    unemployment: 4.2,
    inflation: 5.4,
    internetPenetration: 52,
    smartphoneUsers: 700,
    exports: 778,
    imports: 894,
    defenseBudget: 76,
    renewableEnergy: 175,
    electricVehicles: 3.2,
    manufacturingIndex: 43,
    healthcareExpenditure: 2.1,
    educationExpenditure: 3.1,
    urbanPopulation: 36,
    medianAge: 28.4,
    birthRate: 17,
    deathRate: 7.3,
    fertilityRate: 2.0
  },
  china: {
    name: 'China',
    color: '#DE2910',
    population: {
      2018: 1411750872,
      2019: 1417778528,
      2020: 1424215993,
      2021: 1425887337,
      2022: 1426178947,
      2023: 1425671352,
      2024: 1425060000
    },
    gdp: {
      2018: 13995.9,
      2019: 14365.9,
      2020: 14701.6,
      2021: 17734.1,
      2022: 17963.2,
      2023: 17945,
      2024: 18530
    },
    gdpPerCapita: {
      2018: 9919,
      2019: 10143,
      2020: 10320,
      2021: 12446,
      2022: 12588,
      2023: 12582,
      2024: 13008
    },
    growthRate: {
      2018: 6.67,
      2019: 6.0,
      2020: 2.24,
      2021: 8.4,
      2022: 3.0,
      2023: 5.2,
      2024: 4.6
    },
    literacy: 96.8,
    lifeExpectancy: 78.2,
    unemployment: 5.1,
    inflation: 0.2,
    internetPenetration: 73,
    smartphoneUsers: 1030,
    exports: 3630,
    imports: 2730,
    defenseBudget: 292,
    renewableEnergy: 1169,
    electricVehicles: 14.1,
    manufacturingIndex: 85,
    healthcareExpenditure: 3.0,
    educationExpenditure: 3.6,
    urbanPopulation: 64,
    medianAge: 38.4,
    birthRate: 7.5,
    deathRate: 7.7,
    fertilityRate: 1.2
  }
};

export const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024];

export const populationData = years.map(year => ({
  year,
  India: countryData.india.population[year as keyof typeof countryData.india.population],
  China: countryData.china.population[year as keyof typeof countryData.china.population]
}));

export const gdpData = years.map(year => ({
  year,
  India: countryData.india.gdp[year as keyof typeof countryData.india.gdp],
  China: countryData.china.gdp[year as keyof typeof countryData.china.gdp]
}));

export const gdpPerCapitaData = years.map(year => ({
  year,
  India: countryData.india.gdpPerCapita[year as keyof typeof countryData.india.gdpPerCapita],
  China: countryData.china.gdpPerCapita[year as keyof typeof countryData.china.gdpPerCapita]
}));

export const growthRateData = years.map(year => ({
  year,
  India: countryData.india.growthRate[year as keyof typeof countryData.india.growthRate],
  China: countryData.china.growthRate[year as keyof typeof countryData.china.growthRate]
}));

export const comparisonMetrics = [
  { metric: 'Literacy Rate', India: countryData.india.literacy, China: countryData.china.literacy, unit: '%' },
  { metric: 'Life Expectancy', India: countryData.india.lifeExpectancy, China: countryData.china.lifeExpectancy, unit: 'years' },
  { metric: 'Unemployment Rate', India: countryData.india.unemployment, China: countryData.china.unemployment, unit: '%' },
  { metric: 'Inflation Rate', India: countryData.india.inflation, China: countryData.china.inflation, unit: '%' },
  { metric: 'Internet Penetration', India: countryData.india.internetPenetration, China: countryData.china.internetPenetration, unit: '%' },
  { metric: 'Smartphone Users', India: countryData.india.smartphoneUsers, China: countryData.china.smartphoneUsers, unit: 'million' },
  { metric: 'Exports', India: countryData.india.exports, China: countryData.china.exports, unit: 'billion USD' },
  { metric: 'Imports', India: countryData.india.imports, China: countryData.china.imports, unit: 'billion USD' },
  { metric: 'Defense Budget', India: countryData.india.defenseBudget, China: countryData.china.defenseBudget, unit: 'billion USD' },
  { metric: 'Renewable Energy', India: countryData.india.renewableEnergy, China: countryData.china.renewableEnergy, unit: 'GW' },
  { metric: 'Electric Vehicles', India: countryData.india.electricVehicles, China: countryData.china.electricVehicles, unit: 'million' },
  { metric: 'Manufacturing Index', India: countryData.india.manufacturingIndex, China: countryData.china.manufacturingIndex, unit: 'index' },
  { metric: 'Healthcare Expenditure', India: countryData.india.healthcareExpenditure, China: countryData.china.healthcareExpenditure, unit: '% of GDP' },
  { metric: 'Education Expenditure', India: countryData.india.educationExpenditure, China: countryData.china.educationExpenditure, unit: '% of GDP' },
  { metric: 'Urban Population', India: countryData.india.urbanPopulation, China: countryData.china.urbanPopulation, unit: '%' },
  { metric: 'Median Age', India: countryData.india.medianAge, China: countryData.china.medianAge, unit: 'years' },
  { metric: 'Birth Rate', India: countryData.india.birthRate, China: countryData.china.birthRate, unit: 'per 1000' },
  { metric: 'Death Rate', India: countryData.india.deathRate, China: countryData.china.deathRate, unit: 'per 1000' },
  { metric: 'Fertility Rate', India: countryData.india.fertilityRate, China: countryData.china.fertilityRate, unit: 'children per woman' }
];
