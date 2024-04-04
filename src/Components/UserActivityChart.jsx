import React from "react";
import { Pie } from "react-chartjs-2";
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto"

const UserActivityChart = () => {
  const data = {
    labels: ["Active Users", "Inactive Users"],
    datasets: [
      {
        label: "User Activity",
        data: [70, 30],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <>
      <Pie data={data} />
    </>
  );
};

export default UserActivityChart;
