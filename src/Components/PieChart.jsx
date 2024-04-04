import React, { useContext, useState } from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import { DashboardContext } from "../Context";
import "../App.css";

const PieChart = () => {
  const { conData } = useContext(DashboardContext);

  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedCategory, setSelectedCategory] = useState("Sales");
  const [chartType, setChartType] = useState("Pie");

  const filteredSalesData = conData.filter(
    (entry) => entry.Year === selectedYear
  );

  const labels = filteredSalesData.map((entry) => entry.Month);

  const categories =
    filteredSalesData.length > 0
      ? Object.keys(filteredSalesData[0].Category)
      : [];

  const monthColors = [
    "rgba(255, 99, 132, 0.7)",
    "rgba(54, 162, 235, 0.7)",
    "rgba(255, 205, 86, 0.7)",
    "rgba(75, 192, 192, 0.7)",
    "rgba(153, 102, 255, 0.7)",
    "rgba(255, 159, 64, 0.7)",
    "rgba(255, 69, 0, 0.7)",
    "rgba(0, 255, 0, 0.7)",
    "rgba(0, 0, 255, 0.7)",
    "rgba(128, 0, 128, 0.7)",
    "rgba(255, 140, 0, 0.7)",
    "rgba(30, 144, 255, 0.7)",
  ];

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
    backgroundColor: monthColors,
    borderColor: "rgba(255, 255, 255, 0.8)",
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

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  return (
    <>
      <div style={{ width: "40%", height: "400px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            width: "60%",
            margin: "auto",
            marginTop: "20px",
          }}
        >
          <div className="select-box" style={{ width: "100%" }}>
            <select
              // style={{ width: "60%" }}
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
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
          <div className="select-box">
            <select value={chartType} onChange={handleChartTypeChange}>
              <option value="Pie">Pie Chart</option>
              <option value="Doughnut">Doughnut Chart</option>
            </select>
          </div>
        </div>
        {chartType === "Pie" ? <Pie data={data} /> : <Doughnut data={data} />}
      </div>
    </>
  );
};

export default PieChart;

// import React, { useContext, useState } from "react";
// import { Pie } from "react-chartjs-2";
// import { DashboardContext } from "../Context";
// import "../App.css";

// const PieChart = () => {
//   const { conData } = useContext(DashboardContext);

//   const [selectedYear, setSelectedYear] = useState(2024);
//   const [selectedCategory, setSelectedCategory] = useState("Sales");

//   const filteredSalesData = conData.filter(
//     (entry) => entry.Year === selectedYear
//   );

//   const labels = filteredSalesData.map((entry) => entry.Month);

//   const categories =
//     filteredSalesData.length > 0
//       ? Object.keys(filteredSalesData[0].Category)
//       : [];

//   const colors = [
//     "rgb(255, 99, 132)",
//     "rgb(54, 162, 235)",
//     "rgb(255, 205, 86)",
//   ];
//   const datasets = categories.map((category, index) => ({
//     label: category,
//     data: filteredSalesData.map((entry) =>
//       entry.Category[category]
//         ? entry.Category[category].reduce(
//             (acc, curr) => acc + curr[selectedCategory],
//             0
//           )
//         : 0
//     ),
//     backgroundColor: colors[index],
//     borderColor: "rgba(0, 2, 0, 1)",
//     // borderWidth: 1,
//   }));
//   const data = {
//     labels: labels,
//     datasets: datasets,
//   };

//   const handleYearChange = (e) => {
//     setSelectedYear(parseInt(e.target.value));
//   };

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//   };

//   return (
//     <>
//       <div style={{ width: "50%" }}>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-around",
//             width: "40%",
//             margin: "auto",
//             marginTop: "20px",
//           }}
//         >
//           <div className="select-box">
//             <select value={selectedCategory} onChange={handleCategoryChange}>
//               <option value="Sales">Sales</option>
//               <option value="Revenue">Revenue</option>
//               <option value="UserActivity">UserActivity</option>
//             </select>
//           </div>
//           <div className="select-box">
//             <select value={selectedYear} onChange={handleYearChange}>
//               <option value={2023}>2023</option>
//               <option value={2024}>2024</option>
//             </select>
//           </div>
//         </div>
//         <Pie data={data} />
//       </div>
//     </>
//   );
// };

// export default PieChart;
