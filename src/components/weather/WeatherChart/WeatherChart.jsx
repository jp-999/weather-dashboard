import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import Card from '../../common/Card/Card';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import { useWeather } from '../../../context/WeatherContext';
import { generateTemperatureData, generatePrecipitationData } from '../../../utils/helpers';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const WeatherChart = () => {
  const { hourlyForecast, loading } = useWeather();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!hourlyForecast || hourlyForecast.length === 0) {
    return (
      <Card variant="glass" className="p-8 text-center">
        <h2 className="text-xl font-medium text-white/80">No hourly data available</h2>
        <p className="text-white/50 mt-2">Please try another location</p>
      </Card>
    );
  }

  // Prepare temperature data for chart
  const tempData = generateTemperatureData(hourlyForecast);
  const labels = tempData.map(item => item.time);
  const temperatures = tempData.map(item => item.temperature);

  // Temperature chart options
  const temperatureChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        titleColor: 'rgba(255, 255, 255, 0.8)',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        callbacks: {
          label: function(context) {
            return `Temperature: ${context.parsed.y}°C`;
          }
        }
      },
    },
    scales: {
      y: {
        ticks: { color: 'rgba(255, 255, 255, 0.6)' },
        grid: { 
          color: 'rgba(255, 255, 255, 0.1)',
          borderDash: [5, 5],
        },
        border: { dash: [5, 5] },
      },
      x: {
        ticks: { color: 'rgba(255, 255, 255, 0.6)' },
        grid: { 
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 3,
        hoverRadius: 6,
      },
    },
  };

  // Temperature chart data
  const temperatureChartData = {
    labels: labels,
    datasets: [
      {
        fill: true,
        label: 'Temperature',
        data: temperatures,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
      },
    ],
  };

  // Prepare precipitation data for chart
  const precipData = generatePrecipitationData(hourlyForecast);
  const precipValues = precipData.map(item => item.precipitation);

  // Precipitation chart options
  const precipitationChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        titleColor: 'rgba(255, 255, 255, 0.8)',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            return `Precipitation: ${context.parsed.y} mm`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: 'rgba(255, 255, 255, 0.6)' },
        grid: { 
          color: 'rgba(255, 255, 255, 0.1)',
          borderDash: [5, 5],
        },
        border: { dash: [5, 5] },
      },
      x: {
        ticks: { color: 'rgba(255, 255, 255, 0.6)' },
        grid: { 
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 3,
        hoverRadius: 6,
      },
    },
  };

  // Precipitation chart data
  const precipitationChartData = {
    labels: labels,
    datasets: [
      {
        fill: true,
        label: 'Precipitation',
        data: precipValues,
        borderColor: 'rgba(6, 182, 212, 1)',
        backgroundColor: 'rgba(6, 182, 212, 0.2)',
        pointBackgroundColor: 'rgba(6, 182, 212, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(6, 182, 212, 1)',
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Temperature Forecast</h2>
        <Card variant="glass" className="p-6">
          <div className="h-80">
            <Line options={temperatureChartOptions} data={temperatureChartData} />
          </div>
        </Card>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6">Precipitation Forecast</h2>
        <Card variant="glass" className="p-6">
          <div className="h-80">
            <Line options={precipitationChartOptions} data={precipitationChartData} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WeatherChart; 