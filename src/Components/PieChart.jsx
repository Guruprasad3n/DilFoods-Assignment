import React, { useContext, useState, useEffect } from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import { DashboardContext } from "../Context";

const PieChart = () => {
  const { conData } = useContext(DashboardContext);

  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Sales");
  const [chartType, setChartType] = useState("Pie");

  useEffect(() => {
    const years = [...new Set(conData.map((entry) => entry.Year))];
    setYears(years);
    if (years.length > 0) {
      setSelectedYear(years[0]);
    }
  }, [conData]);

  const filteredSalesData = conData.filter(
    (entry) => entry.Year === selectedYear
  );

  const labels = [selectedYear.toString()];
  let electronicsTotal = 0;
  let fashionTotal = 0;
  filteredSalesData.forEach((entry) => {
    Object.keys(entry.Category).forEach((category) => {
      if (category === "Electronics" || category === "Fashion") {
        if (category === "Electronics") {
          electronicsTotal += entry.Category[category].reduce(
            (acc, curr) => acc + curr[selectedCategory],
            0
          );
        } else {
          fashionTotal += entry.Category[category].reduce(
            (acc, curr) => acc + curr[selectedCategory],
            0
          );
        }
      }
    });
  });
  const categories =
    filteredSalesData.length > 0
      ? Object.keys(filteredSalesData[0].Category)
      : [];

  const monthColors = ["rgba(54, 162, 235, 0.7)", "rgba(255, 205, 86, 0.7)"];

  const datasets = [
    {
      label: "Electronics and Fashion",
      data: [electronicsTotal, fashionTotal],
      backgroundColor: [monthColors[0], monthColors[1]],
      borderColor: "rgba(255, 255, 255, 0.8)",
      borderWidth: 1,
      hoverOffset: 10,
    },
  ];

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

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  return (
    <div className="" style={{ width: "100%" }}>
      <div>
        <div className="select-Box">
          <div style={{ width: "100%" }}>
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="Sales">Sales</option>
              <option value="Revenue">Revenue</option>
              <option value="UserActivity">UserActivity</option>
            </select>
          </div>
          <div className="select-box">
            <select value={selectedYear || ""} onChange={handleYearChange}>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="select-box">
            <select value={chartType} onChange={handleChartTypeChange}>
              <option value="Pie">Pie Chart</option>
              <option value="Doughnut">Doughnut Chart</option>
            </select>
          </div>
        </div>
        {chartType === "Pie" ? <Pie data={data} /> : <Doughnut data={data} />}
      </div>
    </div>
  );
};

export default PieChart;
