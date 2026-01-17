'use client';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { populationData, gdpData, gdpPerCapitaData, growthRateData, countryData } from '../lib/data';

const COLORS = {
  India: countryData.india.color,
  China: countryData.china.color
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">India vs China</h1>
          <p className="text-lg text-gray-600">Comprehensive Data Comparison (2018-2024)</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Population Comparison</h2>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={populationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `${(Number(value) / 1000000000).toFixed(1)}B`} />
                <Tooltip formatter={(value) => value !== undefined ? new Intl.NumberFormat('en-US').format(Number(value)) : ''} />
                <Legend />
                <Line type="monotone" dataKey="India" stroke={COLORS.India} strokeWidth={3} dot={{ fill: COLORS.India }} />
                <Line type="monotone" dataKey="China" stroke={COLORS.China} strokeWidth={3} dot={{ fill: COLORS.China }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">GDP Comparison</h2>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={gdpData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `$${Number(value)}T`} />
                <Tooltip formatter={(value) => value !== undefined ? `$${value.toLocaleString()}B` : ''} />
                <Legend />
                <Line type="monotone" dataKey="India" stroke={COLORS.India} strokeWidth={3} dot={{ fill: COLORS.India }} />
                <Line type="monotone" dataKey="China" stroke={COLORS.China} strokeWidth={3} dot={{ fill: COLORS.China }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">GDP Per Capita</h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={gdpPerCapitaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `$${Number(value)}`} />
                <Tooltip formatter={(value) => value !== undefined ? `$${value.toLocaleString()}` : ''} />
                <Legend />
                <Bar dataKey="India" fill={COLORS.India} radius={[4, 4, 0, 0]} />
                <Bar dataKey="China" fill={COLORS.China} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">GDP Growth Rate</h2>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={growthRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `${Number(value)}%`} />
                <Tooltip formatter={(value) => value !== undefined ? `${value}%` : ''} />
                <Legend />
                <Line type="monotone" dataKey="India" stroke={COLORS.India} strokeWidth={3} dot={{ fill: COLORS.India }} />
                <Line type="monotone" dataKey="China" stroke={COLORS.China} strokeWidth={3} dot={{ fill: COLORS.China }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Trade & Defense Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
              <p className="text-sm text-gray-600 mb-1">India Exports</p>
              <p className="text-2xl font-bold text-gray-900">${countryData.india.exports}B</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
              <p className="text-sm text-gray-600 mb-1">China Exports</p>
              <p className="text-2xl font-bold text-gray-900">${countryData.china.exports}B</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
              <p className="text-sm text-gray-600 mb-1">India Defense</p>
              <p className="text-2xl font-bold text-gray-900">${countryData.india.defenseBudget}B</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
              <p className="text-sm text-gray-600 mb-1">China Defense</p>
              <p className="text-2xl font-bold text-gray-900">${countryData.china.defenseBudget}B</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Social Indicators Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
              <p className="text-sm text-gray-600 mb-1">India Literacy</p>
              <p className="text-2xl font-bold text-gray-900">{countryData.india.literacy}%</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
              <p className="text-sm text-gray-600 mb-1">China Literacy</p>
              <p className="text-2xl font-bold text-gray-900">{countryData.china.literacy}%</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
              <p className="text-sm text-gray-600 mb-1">India Life Expectancy</p>
              <p className="text-2xl font-bold text-gray-900">{countryData.india.lifeExpectancy}y</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
              <p className="text-sm text-gray-600 mb-1">China Life Expectancy</p>
              <p className="text-2xl font-bold text-gray-900">{countryData.china.lifeExpectancy}y</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Technology & Infrastructure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
              <p className="text-sm text-gray-600 mb-1">India Internet</p>
              <p className="text-2xl font-bold text-gray-900">{countryData.india.internetPenetration}%</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
              <p className="text-sm text-gray-600 mb-1">China Internet</p>
              <p className="text-2xl font-bold text-gray-900">{countryData.china.internetPenetration}%</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
              <p className="text-sm text-gray-600 mb-1">India EVs</p>
              <p className="text-2xl font-bold text-gray-900">{countryData.india.electricVehicles}M</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
              <p className="text-sm text-gray-600 mb-1">China EVs</p>
              <p className="text-2xl font-bold text-gray-900">{countryData.china.electricVehicles}M</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Demographics Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
              <p className="text-sm text-gray-600 mb-1">India Median Age</p>
              <p className="text-2xl font-bold text-gray-900">{countryData.india.medianAge}y</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
              <p className="text-sm text-gray-600 mb-1">China Median Age</p>
              <p className="text-2xl font-bold text-gray-900">{countryData.china.medianAge}y</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
              <p className="text-sm text-gray-600 mb-1">India Urban Pop</p>
              <p className="text-2xl font-bold text-gray-900">{countryData.india.urbanPopulation}%</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
              <p className="text-sm text-gray-600 mb-1">China Urban Pop</p>
              <p className="text-2xl font-bold text-gray-900">{countryData.china.urbanPopulation}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Energy & Manufacturing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-3">Renewable Energy Capacity (GW)</p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="w-16 text-sm font-medium text-gray-700">India</span>
                  <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4">
                    <div className="bg-orange-500 h-4 rounded-full" style={{ width: `${(countryData.india.renewableEnergy / countryData.china.renewableEnergy) * 100}%` }}></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{countryData.india.renewableEnergy} GW</span>
                </div>
                <div className="flex items-center">
                  <span className="w-16 text-sm font-medium text-gray-700">China</span>
                  <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4">
                    <div className="bg-red-600 h-4 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{countryData.china.renewableEnergy} GW</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-3">Manufacturing Index Score</p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="w-16 text-sm font-medium text-gray-700">India</span>
                  <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4">
                    <div className="bg-orange-500 h-4 rounded-full" style={{ width: `${(countryData.india.manufacturingIndex / countryData.china.manufacturingIndex) * 100}%` }}></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{countryData.india.manufacturingIndex}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-16 text-sm font-medium text-gray-700">China</span>
                  <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4">
                    <div className="bg-red-600 h-4 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{countryData.china.manufacturingIndex}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Government Expenditure (% of GDP)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="font-medium text-gray-700">India Healthcare</span>
                <span className="text-xl font-bold text-gray-900">{countryData.india.healthcareExpenditure}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="font-medium text-gray-700">India Education</span>
                <span className="text-xl font-bold text-gray-900">{countryData.india.educationExpenditure}%</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="font-medium text-gray-700">China Healthcare</span>
                <span className="text-xl font-bold text-gray-900">{countryData.china.healthcareExpenditure}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="font-medium text-gray-700">China Education</span>
                <span className="text-xl font-bold text-gray-900">{countryData.china.educationExpenditure}%</span>
              </div>
            </div>
          </div>
        </div>

        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Data compiled from various international sources (World Bank, UN, IMF) • Updated 2024</p>
        </footer>
      </div>
    </div>
  );
}
