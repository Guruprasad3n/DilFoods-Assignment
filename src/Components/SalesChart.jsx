import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto"
const SalesChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: "Sales",
        data: [100, 200, 150, 300, 250, 400],
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return <Line data={data} />;
};

export default SalesChart;
