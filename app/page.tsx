'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { populationData, gdpData, gdpPerCapitaData, growthRateData, countryData, comparisonMetrics } from '../lib/data';

// Minimal, pleasing color palette
const COLORS = {
  India: '#10b981', // Emerald 500
  USA: '#3b82f6',   // Blue 500
  Russia: '#f43f5e', // Rose 500
  Europe: '#f59e0b' // Amber 500
};

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getDifference = (country: 'USA' | 'Russia' | 'Europe', metric: string, indiaValue: number, countryValue: number, higherIsBetter: boolean = true) => {
    const diff = countryValue - indiaValue;
    const percentDiff = ((diff / indiaValue) * 100).toFixed(1);
    const isAhead = higherIsBetter ? countryValue > indiaValue : countryValue < indiaValue;
    return { diff, percentDiff, isAhead };
  };

  if (!mounted) return null;

  const bgColor = darkMode ? 'bg-neutral-950' : 'bg-neutral-50';
  const textColor = darkMode ? 'text-neutral-200' : 'text-neutral-800';
  const cardBg = darkMode ? 'bg-neutral-900/50' : 'bg-white';
  const borderColor = darkMode ? 'border-neutral-800' : 'border-neutral-200';
  const secondaryText = darkMode ? 'text-neutral-400' : 'text-neutral-500';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} transition-colors duration-500 font-sans selection:bg-emerald-500/30`}>
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        
        {/* Header Section */}
        <header className="flex flex-col items-center justify-center mb-16 space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight">
              Global Comparison
            </h1>
            <p className={`text-lg ${secondaryText} font-light tracking-wide`}>
              India vs USA, Russia, Europe (2018-2024)
            </p>
          </div>
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`
              px-6 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300
              ${darkMode 
                ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300' 
                : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-700'}
            `}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <ChartCard title="Population (Billions)" darkMode={darkMode} cardBg={cardBg} borderColor={borderColor} secondaryText={secondaryText}>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={populationData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#333' : '#eee'} />
                <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fill: darkMode ? '#737373' : '#a3a3a3', fontSize: 12 }} dy={10} />
                <YAxis tickFormatter={(value) => `${(Number(value) / 1000000000).toFixed(1)}`} tickLine={false} axisLine={false} tick={{ fill: darkMode ? '#737373' : '#a3a3a3', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                <Line type="monotone" dataKey="India" stroke={COLORS.India} strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="USA" stroke={COLORS.USA} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Russia" stroke={COLORS.Russia} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Europe" stroke={COLORS.Europe} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="GDP (Trillions USD)" darkMode={darkMode} cardBg={cardBg} borderColor={borderColor} secondaryText={secondaryText}>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={gdpData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#333' : '#eee'} />
                <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fill: darkMode ? '#737373' : '#a3a3a3', fontSize: 12 }} dy={10} />
                <YAxis tickFormatter={(value) => `${Number(value)}`} tickLine={false} axisLine={false} tick={{ fill: darkMode ? '#737373' : '#a3a3a3', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                <Line type="monotone" dataKey="India" stroke={COLORS.India} strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="USA" stroke={COLORS.USA} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Russia" stroke={COLORS.Russia} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Europe" stroke={COLORS.Europe} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="GDP Per Capita (USD)" darkMode={darkMode} cardBg={cardBg} borderColor={borderColor} secondaryText={secondaryText}>
             <ResponsiveContainer width="100%" height={250}>
              <BarChart data={gdpPerCapitaData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#333' : '#eee'} />
                <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fill: darkMode ? '#737373' : '#a3a3a3', fontSize: 12 }} dy={10} />
                <YAxis tickFormatter={(value) => `${(Number(value) / 1000).toFixed(0)}k`} tickLine={false} axisLine={false} tick={{ fill: darkMode ? '#737373' : '#a3a3a3', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                <Bar dataKey="India" fill={COLORS.India} radius={[4, 4, 0, 0]} />
                <Bar dataKey="USA" fill={COLORS.USA} radius={[4, 4, 0, 0]} />
                <Bar dataKey="Russia" fill={COLORS.Russia} radius={[4, 4, 0, 0]} />
                <Bar dataKey="Europe" fill={COLORS.Europe} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Growth Rate (%)" darkMode={darkMode} cardBg={cardBg} borderColor={borderColor} secondaryText={secondaryText}>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={growthRateData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#333' : '#eee'} />
                <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fill: darkMode ? '#737373' : '#a3a3a3', fontSize: 12 }} dy={10} />
                <YAxis tickFormatter={(value) => `${Number(value)}`} tickLine={false} axisLine={false} tick={{ fill: darkMode ? '#737373' : '#a3a3a3', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                <Line type="monotone" dataKey="India" stroke={COLORS.India} strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="USA" stroke={COLORS.USA} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Russia" stroke={COLORS.Russia} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Europe" stroke={COLORS.Europe} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Comparison Metrics */}
        <div className={`rounded-3xl p-8 mb-16 ${cardBg} border ${borderColor} backdrop-blur-sm`}>
          <h2 className="text-2xl font-light mb-8 text-center">Metric Comparison</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12">
            {comparisonMetrics.map((item, idx) => {
               const higherIsBetter = !['Unemployment Rate', 'Inflation Rate', 'Death Rate'].includes(item.metric);
               return (
                <div key={idx} className="space-y-4">
                  <div className="flex justify-between items-end border-b border-neutral-800/20 pb-2">
                    <span className={`text-sm uppercase tracking-wider font-semibold ${secondaryText}`}>{item.metric}</span>
                  </div>
                  
                  {/* India (Highlight) */}
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.India }}></div>
                       <span className="font-medium">India</span>
                    </div>
                    <span className="text-xl font-bold font-mono tracking-tight">{item.India} <span className="text-xs font-sans font-normal opacity-50">{item.unit}</span></span>
                  </div>

                  {/* Others */}
                  {(['USA', 'Russia', 'Europe'] as const).map((country) => {
                    const countryValue = item[country] as number;
                    const { isAhead } = getDifference(country, item.metric, item.India, countryValue, higherIsBetter);
                    
                    return (
                      <div key={country} className="flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full opacity-60" style={{ backgroundColor: COLORS[country] }}></div>
                          <span className={`${secondaryText}`}>{country}</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <span className={`text-xs ${isAhead ? 'text-emerald-500' : 'text-rose-500'}`}>
                              {isAhead ? 'Better' : 'Worse'}
                           </span>
                           <span className="font-mono">{countryValue}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend / Key */}
        <div className="flex justify-center gap-8 mb-12 flex-wrap">
           {Object.entries(COLORS).map(([name, color]) => (
             <div key={name} className="flex items-center gap-2">
               <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></span>
               <span className={`text-sm ${secondaryText}`}>{name}</span>
             </div>
           ))}
        </div>

        <footer className={`text-center mt-20 ${secondaryText} text-xs font-light tracking-widest uppercase`}>
          Data: World Bank, UN, IMF • 2024
        </footer>
      </div>
    </div>
  );
}

// Subcomponents for cleaner code
function ChartCard({ children, title, darkMode, cardBg, borderColor, secondaryText }: any) {
  return (
    <div className={`rounded-3xl p-6 md:p-8 ${cardBg} border ${borderColor} backdrop-blur-sm hover:shadow-lg transition-shadow duration-300`}>
      <h3 className={`text-lg font-medium mb-6 text-center ${secondaryText}`}>{title}</h3>
      {children}
    </div>
  );
}

function CustomTooltip({ active, payload, label, darkMode }: any) {
  if (active && payload && payload.length) {
    return (
      <div className={`p-4 rounded-xl shadow-xl text-xs ${darkMode ? 'bg-neutral-900 border border-neutral-800' : 'bg-white border border-neutral-100'}`}>
        <p className={`font-semibold mb-2 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className={darkMode ? 'text-neutral-400' : 'text-neutral-500'}>{entry.name}:</span>
            <span className={`font-mono font-medium ${darkMode ? 'text-neutral-200' : 'text-neutral-800'}`}>
              {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
