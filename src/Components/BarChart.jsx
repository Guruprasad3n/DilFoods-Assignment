import React, { useContext, useState } from "react";
import { Bar } from "react-chartjs-2";
import { DashboardContext } from "../Context";

const BarChart = () => {
  const { conData } = useContext(DashboardContext);

  const [selectedYear, setSelectedYear] = useState(2023); // Update default year
  const [selectedCategory, setSelectedCategory] = useState("Revenue"); // Update default category

  // Filter data based on selected year
  const filteredSalesData = conData.filter(
    (entry) => entry.Year === selectedYear
  );

  // Extract labels (months)
  const labels = filteredSalesData.map((entry) => entry.Month);

  // Extract categories
  const categories =
    filteredSalesData.length > 0
      ? Object.keys(filteredSalesData[0].Category)
      : [];

  // Prepare datasets for the chart

  const colors = ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 2)"];
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
    borderColor: "rgba(0, 0, 0, 1)",
    borderWidth: 0,
  }));
  // `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
  //   Math.random() * 255
  // }, 0.6)`
  const data = {
    labels: labels,
    datasets: datasets,
  };

  // Event handlers for dropdowns
  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="Sales">Sales</option>
        <option value="Revenue">Revenue</option>
        <option value="UserActivity">UserActivity</option>
      </select>
      <select value={selectedYear} onChange={handleYearChange}>
        <option value={2023}>2023</option>
        <option value={2024}>2024</option>
      </select>
      <Bar data={data} />
    </>
  );
};

export default BarChart;

// import React, { useContext, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import { DashboardContext } from "../Context";

// const BarChart = () => {
//   const { conData } = useContext(DashboardContext);

//   const [selectedYear, setSelectedYear] = useState(2024);
//   const [selectedCategory, setSelectedCategory] = useState("Revenue");

//   const filteredSalesData = conData.filter(
//     (entry) => entry.Year === selectedYear
//   );
//   console.log("conData", filteredSalesData);

//   const labels = filteredSalesData.map((entry) => entry.Month);

//   console.log("label", labels);
//   const categories =
//     filteredSalesData.length > 0
//       ? Object.keys(filteredSalesData[0].Category)
//       : [];
//   console.log("categories", categories);

//   const colors = ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"];
//   const datasets = categories.map((category, index) => ({
//     label: category,
//     data: filteredSalesData.map((entry) =>
//       entry.Category[category] ? entry.Category[category] : 0
//     ),
//     backgroundColor: colors[index],
//     borderColor: "rgba(0, 0, 0, 1)",
//     borderWidth: 0,
//   }));

//   const data = {
//     labels: labels,
//     datasets: datasets,
//   };
//   console.log("set Data", data.datasets);

//   const handleYearChange = (e) => {
//     setSelectedYear(parseInt(e.target.value));
//   };

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//   };

//   return (
//     <>
//       <select value={selectedCategory} onChange={handleCategoryChange}>
//         <option value="Sales">Sales</option>
//         <option value="Revenue">Revenue</option>
//         <option value="UserActivity">UserActivity</option>
//       </select>
//       <select value={selectedYear} onChange={handleYearChange}>
//         <option value={2023}>2023</option>
//         <option value={2024}>2024</option>
//       </select>
//       <Bar data={data} />
//     </>
//   );
// };

// export default BarChart;
