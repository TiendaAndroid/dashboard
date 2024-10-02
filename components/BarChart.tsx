// page.js this is the entry point of application

"use client";
import dynamic from "next/dynamic";
import "chart.js/auto";
import { useEffect, useState } from "react";
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});
let delayed: boolean;

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};
const BarChart = () => {
  const api = "http://localhost:3000/api";

  const [count, setCount] = useState<Number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api}/orders/weekly-sales`);
        const data = await response.json();
        setCount(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  console.log(count);

  const data = {
    labels: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    datasets: [
      {
        label: "Ventas",
        data: count,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(101, 255, 133, 0.2)",  // Nuevo color
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(101, 255, 133, 1)",   // Nuevo color
        ],
        
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="flex flex-col text-[#06004E] text-xl font-bold w-full h-full space-y-5 ">
      <h1>Ventas de la Semana</h1>
      <Bar data={data} options={options} />
    </div>
  );
};
export default BarChart;
