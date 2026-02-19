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
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { WAGE_DATA } from '@/data/min-wage';
import type { StateWageData } from '@/types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
  selectedStates: string[];
  showTipped: boolean;
}

const YEARS = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031];

export default function MinWageChart({ selectedStates, showTipped }: Props) {
  // Build datasets
  const datasets: ChartData<'line'>['datasets'] = [];
  const visibleValues: number[] = [];

  WAGE_DATA.filter((s) => selectedStates.includes(s.state)).forEach((stateData: StateWageData) => {
    const wages = YEARS.map((yr) => {
      const dp = stateData.data.find((d) => d.year === yr);
      return dp ? dp.standard : null;
    });
    wages.forEach((value) => {
      if (typeof value === 'number') visibleValues.push(value);
    });

    datasets.push({
      label: `${stateData.state} Standard`,
      data: wages as (number | null)[],
      borderColor: stateData.color,
      backgroundColor: stateData.color + '20',
      borderWidth: 2.5,
      pointRadius: 4,
      pointHoverRadius: 6,
      tension: 0.2,
    });

    if (showTipped) {
      const tippedWages = YEARS.map((yr) => {
        const dp = stateData.data.find((d) => d.year === yr);
        return dp ? dp.tipped : null;
      });
      tippedWages.forEach((value) => {
        if (typeof value === 'number') visibleValues.push(value);
      });

      datasets.push({
        label: `${stateData.state} Tipped`,
        data: tippedWages as (number | null)[],
        borderColor: stateData.color,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderDash: [6, 3],
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.2,
      });
    }
  });

  const data: ChartData<'line'> = {
    labels: YEARS.map(String),
    datasets,
  };

  const minValue = visibleValues.length > 0 ? Math.min(...visibleValues) : 0;
  const maxValue = visibleValues.length > 0 ? Math.max(...visibleValues) : 20;
  const yMin = Math.max(0, Math.floor(minValue - 1));
  const yMax = Math.ceil(maxValue + 1);

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
          font: { size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: $${(ctx.parsed.y ?? 0).toFixed(2)}/hr`,
          afterBody: (items) => {
            const hasEstimate = items.some((item) => {
              const label = item.dataset.label ?? '';
              const state = label.replace(/ (Standard|Tipped)$/, '');
              const yr = YEARS[item.dataIndex];
              const point = WAGE_DATA.find((s) => s.state === state)?.data.find((d) => d.year === yr);
              return Boolean(point?.note && /estimated|assumes/i.test(point.note));
            });

            return hasEstimate ? ['(estimated)'] : [];
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { font: { size: 12 } },
        grid: { color: 'rgba(0,0,0,0.05)' },
        // currentYear used for tooltip context above
      },
      y: {
        min: yMin,
        max: yMax,
        ticks: {
          font: { size: 12 },
          callback: (val) => `$${val}`,
          stepSize: 1,
        },
        title: {
          display: true,
          text: '$/hour',
          font: { size: 12 },
        },
        grid: { color: 'rgba(0,0,0,0.05)' },
      },
    },
  };

  return (
    <div style={{ height: 380 }}>
      <Line data={data} options={options} />
    </div>
  );
}
