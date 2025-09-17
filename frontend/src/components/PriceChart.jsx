import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ChartDataLabels);

import annotationPlugin from "chartjs-plugin-annotation";
ChartJS.register(annotationPlugin);

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function PriceChart({ launchPrice, salePrice, extraDiscountPrice }) {
  const data = {
    labels: ["Launch", "Sale", "After Discounts"],
    datasets: [
      {
        label: "Price (₹)",
        data: [launchPrice, salePrice, extraDiscountPrice],
        backgroundColor: ["#9333ea", "#3b82f6", "#10b981"],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `₹${context.parsed.y.toLocaleString()}`,
        },
      },
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: (value, context) => {
          const base = context.chart.data.datasets[0].data[0]; // launch price
          const percent = ((value - base) / base) * 100;
          return `${percent > 0 ? "+" : ""}${percent.toFixed(1)}%`;
        },
        color: "#000",
        font: { weight: "bold" },
      },
      annotation: {
        annotations: {
          launchLine: {
            type: "line",
            yMin: launchPrice,
            yMax: launchPrice,
            borderColor: "#F0F",
            borderWidth: 1,
            label: {
              content: "Launch Price",
              enabled: true,
              position: "end",
              backgroundColor: "#f59e0b",
              color: "#000",
              font: { weight: "bold" },
            },
          },
          saleLine: {
            type: "line",
            yMin: salePrice,
            yMax: salePrice,
            borderColor: "#00F",
            borderWidth: 1,
            label: {
              content: "Sale Price",
              enabled: true,
              position: "end",
              backgroundColor: "#f59e0b",
              color: "#000",
              font: { weight: "bold" },
            },
          },
          discountLine: {
            type: "line",
            yMin: extraDiscountPrice,
            yMax: extraDiscountPrice,
            borderColor: "#0F0",
            borderWidth: 1,
            label: {
              content: "Discounted Price",
              enabled: true,
              position: "end",
              backgroundColor: "#f59e0b",
              color: "#000",
              font: { weight: "bold" },
            },
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: Math.floor(launchPrice * 1.2),
        ticks: {
          callback: (value) => `₹${value}`,
        },
      },
    },
  };
  
  return (
    <div className="flex justify-center  w-[340px] lg:w-[450px] xl:w-full sm:max-w-[700px] h-[250px] md:h-[350px] rounded-xl shadow-md p-4 bg-gray-200 shadow-gray-800">
      <Bar data={data} options={options} />
    </div>
  );
}
