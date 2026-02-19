'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { generateBenefitPoints } from '@/data/benefits-cliff';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface Props {
  householdSize: number;
  currentIncome: number;
}

export default function BenefitsCliffChart({ householdSize, currentIncome }: Props) {
  const points = generateBenefitPoints(householdSize, 6000, 100);

  const labels = points.map((p) => `$${p.income.toLocaleString()}`);

  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'SNAP Benefit',
        data: points.map((p) => p.snap),
        borderColor: '#1a56db',
        backgroundColor: 'rgba(26,86,219,0.08)',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Childcare Subsidy',
        data: points.map((p) => p.childcare),
        borderColor: '#ff5a1f',
        backgroundColor: 'rgba(255,90,31,0.08)',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Combined Total',
        data: points.map((p) => p.total),
        borderColor: '#111827',
        backgroundColor: 'transparent',
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 5,
        fill: false,
        tension: 0.3,
      },
    ],
  };

  // Find the index closest to the current income
  const incomeIndex = points.findIndex((p) => p.income >= currentIncome);
  const currentLabel = `$${currentIncome.toLocaleString()}`;

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 16,
          font: { size: 13 },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: $${(ctx.parsed.y ?? 0).toLocaleString()}/mo`,
          title: (items) => `Income: ${items[0].label}/mo`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 8,
          font: { size: 11 },
          callback: (val, i) => {
            const income = points[i]?.income;
            return income !== undefined && income % 1000 === 0 ? `$${income / 1000}k` : '';
          },
        },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: { size: 11 },
          callback: (val) => `$${val}`,
        },
        title: {
          display: true,
          text: 'Monthly Benefit Value ($)',
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <div className="relative">
      <div style={{ height: 340 }}>
        <Line data={data} options={options} />
      </div>
      {/* Current income indicator line (rendered as CSS overlay) */}
      {incomeIndex > 0 && (
        <div
          className="absolute top-0 bottom-8 border-l-2 border-dashed border-red-500 pointer-events-none"
          style={{
            left: `calc(${(incomeIndex / (points.length - 1)) * 100}% * 0.92 + 4%)`,
          }}
          aria-label={`Current income: ${currentLabel}`}
        >
          <span className="absolute -top-1 left-1 text-xs text-red-600 font-semibold whitespace-nowrap bg-white px-1 rounded">
            {currentLabel}/mo
          </span>
        </div>
      )}
    </div>
  );
}
