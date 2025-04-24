'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Card from '@/components/ui/Card';
import { usePriceHistory } from '@/utils/api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
  selectedCrypto: string;
}

interface PriceHistory {
  prices: [number, number][];
}

export default function PriceChart({ selectedCrypto }: Props) {
  const { data: priceHistory, isLoading, error } = usePriceHistory(selectedCrypto);
  const chartData = {
    labels: (priceHistory as PriceHistory)?.prices.map((p) => new Date(p[0]).toLocaleDateString()) || [],
    datasets: [
      {
        label: 'Price (USD)',
        data: (priceHistory as PriceHistory)?.prices.map((p) => p[1]) || [],
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.3)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#fff',
        },
      },
      title: {
        display: true,
        text: `${selectedCrypto.toUpperCase()} - 7 Day Price Trend`,
        color: '#fff',
      },
    },
    scales: {
      x: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
      y: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
    },
  };

  return (
    <Card className="p-4 h-[300px] bg-gray-950 border border-purple-700 rounded-2xl">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin h-8 w-8 border-4 border-purple-400 border-t-transparent rounded-full" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-full">
          <div className="text-red-500 text-center">{error.message}</div>
        </div>
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </Card>
  );
}
