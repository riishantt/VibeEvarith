'use client';

import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { populationData, gdpData, gdpPerCapitaData, growthRateData, countryData, comparisonMetrics } from '../lib/data';

const COLORS = {
  India: countryData.india.color,
  USA: countryData.usa.color,
  Russia: countryData.russia.color,
  Europe: countryData.europe.color
};

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const getDifference = (country: 'USA' | 'Russia' | 'Europe', metric: string, indiaValue: number, countryValue: number, higherIsBetter: boolean = true) => {
    const diff = countryValue - indiaValue;
    const percentDiff = ((diff / indiaValue) * 100).toFixed(1);
    const isAhead = higherIsBetter ? countryValue > indiaValue : countryValue < indiaValue;
    return { diff, percentDiff, isAhead };
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gray-50'} p-3 sm:p-4 md:p-8 transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-12 gap-4">
          <div className="text-center sm:text-left">
            <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Global Comparison</h1>
            <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>India vs USA, Russia, Europe (2018-2024)</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              darkMode 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </header>

        <div className="space-y-4 sm:space-y-6">
          <div className={`rounded-xl shadow-lg p-4 sm:p-6 ${darkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-white'}`}>
            <h2 className={`text-lg sm:text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Population Comparison</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={populationData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#333' : '#e0e0e0'} />
                <XAxis dataKey="year" stroke={darkMode ? '#888' : '#666'} />
                <YAxis tickFormatter={(value) => `${(Number(value) / 1000000000).toFixed(1)}B`} stroke={darkMode ? '#888' : '#666'} />
                <Tooltip 
                  formatter={(value) => value !== undefined ? new Intl.NumberFormat('en-US').format(Number(value)) : ''}
                  contentStyle={{ backgroundColor: darkMode ? '#1a1a1a' : '#fff', border: darkMode ? '1px solid #333' : '1px solid #ddd', borderRadius: '8px' }}
                  labelStyle={{ color: darkMode ? '#fff' : '#333' }}
                />
                <Legend />
                <Line type="monotone" dataKey="India" stroke={COLORS.India} strokeWidth={2} dot={{ fill: COLORS.India, r: 4 }} />
                <Line type="monotone" dataKey="USA" stroke={COLORS.USA} strokeWidth={2} dot={{ fill: COLORS.USA, r: 4 }} />
                <Line type="monotone" dataKey="Russia" stroke={COLORS.Russia} strokeWidth={2} dot={{ fill: COLORS.Russia, r: 4 }} />
                <Line type="monotone" dataKey="Europe" stroke={COLORS.Europe} strokeWidth={2} dot={{ fill: COLORS.Europe, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className={`rounded-xl shadow-lg p-4 sm:p-6 ${darkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-white'}`}>
            <h2 className={`text-lg sm:text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>GDP Comparison</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={gdpData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#333' : '#e0e0e0'} />
                <XAxis dataKey="year" stroke={darkMode ? '#888' : '#666'} />
                <YAxis tickFormatter={(value) => `$${Number(value)}T`} stroke={darkMode ? '#888' : '#666'} />
                <Tooltip 
                  formatter={(value) => value !== undefined ? `$${value.toLocaleString()}B` : ''}
                  contentStyle={{ backgroundColor: darkMode ? '#1a1a1a' : '#fff', border: darkMode ? '1px solid #333' : '1px solid #ddd', borderRadius: '8px' }}
                  labelStyle={{ color: darkMode ? '#fff' : '#333' }}
                />
                <Legend />
                <Line type="monotone" dataKey="India" stroke={COLORS.India} strokeWidth={2} dot={{ fill: COLORS.India, r: 4 }} />
                <Line type="monotone" dataKey="USA" stroke={COLORS.USA} strokeWidth={2} dot={{ fill: COLORS.USA, r: 4 }} />
                <Line type="monotone" dataKey="Russia" stroke={COLORS.Russia} strokeWidth={2} dot={{ fill: COLORS.Russia, r: 4 }} />
                <Line type="monotone" dataKey="Europe" stroke={COLORS.Europe} strokeWidth={2} dot={{ fill: COLORS.Europe, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className={`rounded-xl shadow-lg p-4 sm:p-6 ${darkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-white'}`}>
            <h2 className={`text-lg sm:text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>GDP Per Capita</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={gdpPerCapitaData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#333' : '#e0e0e0'} />
                <XAxis dataKey="year" stroke={darkMode ? '#888' : '#666'} />
                <YAxis tickFormatter={(value) => `$${Number(value)}`} stroke={darkMode ? '#888' : '#666'} />
                <Tooltip 
                  formatter={(value) => value !== undefined ? `$${value.toLocaleString()}` : ''}
                  contentStyle={{ backgroundColor: darkMode ? '#1a1a1a' : '#fff', border: darkMode ? '1px solid #333' : '1px solid #ddd', borderRadius: '8px' }}
                  labelStyle={{ color: darkMode ? '#fff' : '#333' }}
                />
                <Legend />
                <Bar dataKey="India" fill={COLORS.India} radius={[4, 4, 0, 0]} />
                <Bar dataKey="USA" fill={COLORS.USA} radius={[4, 4, 0, 0]} />
                <Bar dataKey="Russia" fill={COLORS.Russia} radius={[4, 4, 0, 0]} />
                <Bar dataKey="Europe" fill={COLORS.Europe} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={`rounded-xl shadow-lg p-4 sm:p-6 ${darkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-white'}`}>
            <h2 className={`text-lg sm:text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>GDP Growth Rate</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={growthRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#333' : '#e0e0e0'} />
                <XAxis dataKey="year" stroke={darkMode ? '#888' : '#666'} />
                <YAxis tickFormatter={(value) => `${Number(value)}%`} stroke={darkMode ? '#888' : '#666'} />
                <Tooltip 
                  formatter={(value) => value !== undefined ? `${value}%` : ''}
                  contentStyle={{ backgroundColor: darkMode ? '#1a1a1a' : '#fff', border: darkMode ? '1px solid #333' : '1px solid #ddd', borderRadius: '8px' }}
                  labelStyle={{ color: darkMode ? '#fff' : '#333' }}
                />
                <Legend />
                <Line type="monotone" dataKey="India" stroke={COLORS.India} strokeWidth={2} dot={{ fill: COLORS.India, r: 4 }} />
                <Line type="monotone" dataKey="USA" stroke={COLORS.USA} strokeWidth={2} dot={{ fill: COLORS.USA, r: 4 }} />
                <Line type="monotone" dataKey="Russia" stroke={COLORS.Russia} strokeWidth={2} dot={{ fill: COLORS.Russia, r: 4 }} />
                <Line type="monotone" dataKey="Europe" stroke={COLORS.Europe} strokeWidth={2} dot={{ fill: COLORS.Europe, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className={`rounded-xl shadow-lg p-4 sm:p-6 ${darkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-white'}`}>
            <h2 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>How Others Compare to India</h2>
            <div className="space-y-4">
              {comparisonMetrics.map((item, idx) => {
                const higherIsBetter = !['Unemployment Rate', 'Inflation Rate', 'Death Rate'].includes(item.metric);
                
                return (
                  <div key={idx} className={`rounded-lg p-3 sm:p-4 ${darkMode ? 'bg-zinc-800 border border-zinc-700' : 'bg-gray-50'}`}>
                    <div className={`text-base sm:text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.metric}</div>
                    <div className={`flex items-center justify-between p-2 sm:p-3 rounded-lg mb-2 bg-gradient-to-r from-orange-500/10 to-transparent border-l-4 border-orange-500`}>
                      <span className={`font-medium text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>India</span>
                      <span className={`text-base sm:text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.India} {item.unit}</span>
                    </div>
                    
                    {(['USA', 'Russia', 'Europe'] as const).map((country) => {
                      const countryValue = item[country] as number;
                      const { percentDiff, isAhead } = getDifference(country, item.metric, item.India, countryValue, higherIsBetter);
                      
                      return (
                        <div key={country} className={`flex items-center justify-between p-2 sm:p-3 rounded-lg mb-2 ${darkMode ? 'bg-zinc-900 border' : 'bg-white border'} ${isAhead ? `border-l-4 border-[${COLORS[country]}]` : 'border-l-4 border-gray-300'}`}>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[country] }}></div>
                            <span className={`font-medium text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{country}</span>
                          </div>
                          <div className="text-right">
                            <div className={`text-base sm:text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{countryValue} {item.unit}</div>
                            <div className={`text-xs sm:text-sm ${isAhead ? 'text-green-500' : 'text-red-500'}`}>
                              {isAhead ? '▲' : '▼'} {Math.abs(parseFloat(percentDiff))}% {isAhead ? 'ahead' : 'behind'} India
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`rounded-xl shadow-lg p-4 sm:p-6 ${darkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-white'}`}>
            <h2 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Trade & Defense Comparison</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                { name: 'India Exports', value: countryData.india.exports, color: 'bg-orange-500/10 border-orange-500' },
                { name: 'USA Exports', value: countryData.usa.exports, color: 'bg-blue-500/10 border-blue-500' },
                { name: 'Russia Exports', value: countryData.russia.exports, color: 'bg-red-500/10 border-red-500' },
                { name: 'Europe Exports', value: countryData.europe.exports, color: 'bg-amber-500/10 border-amber-500' },
              ].map((item, idx) => (
                <div key={idx} className={`text-center p-3 sm:p-4 rounded-lg border-l-4 ${item.color}`}>
                  <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{item.name}</p>
                  <p className={`text-lg sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>${item.value}B</p>
                </div>
              ))}
              {[
                { name: 'India Defense', value: countryData.india.defenseBudget, color: 'bg-orange-500/10 border-orange-500' },
                { name: 'USA Defense', value: countryData.usa.defenseBudget, color: 'bg-blue-500/10 border-blue-500' },
                { name: 'Russia Defense', value: countryData.russia.defenseBudget, color: 'bg-red-500/10 border-red-500' },
                { name: 'Europe Defense', value: countryData.europe.defenseBudget, color: 'bg-amber-500/10 border-amber-500' },
              ].map((item, idx) => (
                <div key={idx} className={`text-center p-3 sm:p-4 rounded-lg border-l-4 ${item.color}`}>
                  <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{item.name}</p>
                  <p className={`text-lg sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>${item.value}B</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-xl shadow-lg p-4 sm:p-6 ${darkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-white'}`}>
            <h2 className={`text-lg sm:text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Energy & Manufacturing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>Renewable Energy Capacity (GW)</p>
                <div className="space-y-3">
                  {[
                    { name: 'India', value: countryData.india.renewableEnergy, color: 'bg-orange-500', percent: ((countryData.india.renewableEnergy / countryData.usa.renewableEnergy) * 100).toFixed(0) },
                    { name: 'USA', value: countryData.usa.renewableEnergy, color: 'bg-blue-500', percent: 100 },
                    { name: 'Russia', value: countryData.russia.renewableEnergy, color: 'bg-red-500', percent: ((countryData.russia.renewableEnergy / countryData.usa.renewableEnergy) * 100).toFixed(0) },
                    { name: 'Europe', value: countryData.europe.renewableEnergy, color: 'bg-amber-500', percent: ((countryData.europe.renewableEnergy / countryData.usa.renewableEnergy) * 100).toFixed(0) }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center">
                      <span className={`w-16 text-xs sm:text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.name}</span>
                      <div className={`flex-1 mx-2 sm:mx-4 ${darkMode ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full h-3 sm:h-4`}>
                        <div className={`${item.color} h-3 sm:h-4 rounded-full`} style={{ width: `${item.percent}%` }}></div>
                      </div>
                      <span className={`text-xs sm:text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.value} GW</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>Manufacturing Index Score</p>
                <div className="space-y-3">
                  {[
                    { name: 'India', value: countryData.india.manufacturingIndex, color: 'bg-orange-500', percent: ((countryData.india.manufacturingIndex / countryData.europe.manufacturingIndex) * 100).toFixed(0) },
                    { name: 'USA', value: countryData.usa.manufacturingIndex, color: 'bg-blue-500', percent: ((countryData.usa.manufacturingIndex / countryData.europe.manufacturingIndex) * 100).toFixed(0) },
                    { name: 'Russia', value: countryData.russia.manufacturingIndex, color: 'bg-red-500', percent: ((countryData.russia.manufacturingIndex / countryData.europe.manufacturingIndex) * 100).toFixed(0) },
                    { name: 'Europe', value: countryData.europe.manufacturingIndex, color: 'bg-amber-500', percent: 100 }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center">
                      <span className={`w-16 text-xs sm:text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.name}</span>
                      <div className={`flex-1 mx-2 sm:mx-4 ${darkMode ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full h-3 sm:h-4`}>
                        <div className={`${item.color} h-3 sm:h-4 rounded-full`} style={{ width: `${item.percent}%` }}></div>
                      </div>
                      <span className={`text-xs sm:text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-lg p-4 sm:p-6 ${darkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-white'}`}>
            <h2 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Government Expenditure (% of GDP)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                { country: 'India', healthcare: countryData.india.healthcareExpenditure, education: countryData.india.educationExpenditure, color: 'bg-orange-500/10 border-orange-500' },
                { country: 'USA', healthcare: countryData.usa.healthcareExpenditure, education: countryData.usa.educationExpenditure, color: 'bg-blue-500/10 border-blue-500' },
                { country: 'Russia', healthcare: countryData.russia.healthcareExpenditure, education: countryData.russia.educationExpenditure, color: 'bg-red-500/10 border-red-500' },
                { country: 'Europe', healthcare: countryData.europe.healthcareExpenditure, education: countryData.europe.educationExpenditure, color: 'bg-amber-500/10 border-amber-500' }
              ].map((item, idx) => (
                <div key={idx} className={`p-3 sm:p-4 rounded-lg border-l-4 ${item.color}`}>
                  <p className={`text-sm font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.country}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Healthcare</span>
                      <span className={`text-base sm:text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.healthcare}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Education</span>
                      <span className={`text-base sm:text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.education}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className={`text-center mt-8 sm:mt-12 ${darkMode ? 'text-gray-500' : 'text-gray-500'} text-xs sm:text-sm`}>
          <p>Data compiled from various international sources (World Bank, UN, IMF) • Updated 2024</p>
        </footer>
      </div>
    </div>
  );
}
