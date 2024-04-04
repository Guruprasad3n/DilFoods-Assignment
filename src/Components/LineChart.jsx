import React, { useContext, useState } from "react";
import { Line } from "react-chartjs-2";
import { DashboardContext } from "../Context";
import "../App.css";

const LineChart = () => {
  const { conData } = useContext(DashboardContext);

  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedCategory, setSelectedCategory] = useState("Sales");

  const filteredSalesData = conData.filter(
    (entry) => entry.Year === selectedYear
  );

  const labels = filteredSalesData.map((entry) => entry.Month);

  const categories =
    filteredSalesData.length > 0
      ? Object.keys(filteredSalesData[0].Category)
      : [];

  const colors = ["rgba(206, 167, 225, 0.8)", "rgba(177, 245, 214, 0.8)"];
  const datasets = categories.map((category, index) => ({
    label: category,
    data: filteredSalesData.map((entry) =>
      entry.Category[category]
        ? entry.Category[category].reduce(
            (acc, curr) => acc + curr[selectedCategory],
            0
          )
        : 0
    ),
    backgroundColor: colors[index],
    borderColor: "rgba(0, 2, 0, 1)",
    borderWidth: 1,
  }));
  const data = {
    labels: labels,
    datasets: datasets,
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <>
      <div style={{ width: "40%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            width: "40%",
            margin: "auto",
            marginTop: "20px",
          }}
        >
          <div className="select-box">
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="Sales">Sales</option>
              <option value="Revenue">Revenue</option>
              <option value="UserActivity">UserActivity</option>
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
    </>
  );
};

export default LineChart;