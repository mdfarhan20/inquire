"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface ChartProps {
  labels: string[],
  datasets: {
    label?: string,
    data: number[],
  }[]
}

export function BarChart(props : ChartProps) {
  const datasets = props.datasets.map(set => ({ ...set, backgroundColor: "white" }));

  return (
    <div className="w-full">
      <Bar
        className="max-w-95 w-full h-20"
        data={{
          labels: props.labels,
          datasets
        }}
        options={{
          indexAxis: "y",
          responsive: true,
          elements: {
            bar: { borderWidth: 1 }
          }
        }}
      />
    </div>
  )
}