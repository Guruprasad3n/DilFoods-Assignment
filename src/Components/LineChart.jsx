import React, { useContext, useState } from "react";
import { Line } from "react-chartjs-2";
import { DashboardContext } from "../Context";

const LineChart = () => {
  const { conData } = useContext(DashboardContext);

  const [selectedYear, setSelectedYear] = useState(2023);
  const [selectedCategory, setSelectedCategory] = useState("Electronics");

  const filteredData = conData.filter((entry) => entry.Year === selectedYear);

  const months = filteredData.map((entry) => entry.Month);

  const categorySalesData = Array(months.length).fill(0);
  const categoryUserActivityData = Array(months.length).fill(0);

  filteredData.forEach((entry) => {
    if (entry.Category[selectedCategory]) {
      const index = months.indexOf(entry.Month);
      entry.Category[selectedCategory].forEach((product) => {
        categorySalesData[index] += product.Sales;
        categoryUserActivityData[index] += product.UserActivity;
      });
    }
  });

  const datasets = [
    {
      label: "Sales",
      data: categorySalesData,
      backgroundColor: "rgba(206, 167, 225, 0.8)",
      borderColor: "rgba(224, 221, 226, 0.8)",
      borderWidth: 2,
      hoverOffset: 10,
    },
    {
      label: "UserActivity",
      data: categoryUserActivityData,
      backgroundColor: "rgba(177, 245, 214, 0.8)",
      borderColor: "rgba(224, 221, 226, 0.8)",
      borderWidth: 2,
      hoverOffset: 10,
    },
  ];

  const data = {
    labels: months,
    datasets: datasets,
  };
  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="">
      <div>
        <div className="select-Box">
          <div>
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>
          <div className="select-box">
            <select value={selectedYear} onChange={handleYearChange}>
              <option value={2023}>2023</option>
              <option value={2024}>2024</option>
            </select>
          </div>
        </div>
        <Line data={data} />
      </div>
    </div>
  );
};

export default LineChart;
