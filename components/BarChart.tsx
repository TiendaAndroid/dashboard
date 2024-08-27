// page.js this is the entry point of application

"use client";
import dynamic from "next/dynamic";
import "chart.js/auto";
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});
const data = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Ventas",
      data: [12, 19, 3, 5, 2, 3, 1, 2, 3, 1, 18, 70],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};
const BarChart = () => {
  return (
    <div className="flex flex-col  w-full h-full space-y-5">
      <h1>Ventas al año</h1>
      <Bar data={data} options={options} />
    </div>
  );
};
export default BarChart;
