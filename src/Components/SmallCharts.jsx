import React, { useContext, useState, useEffect } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { DashboardContext } from "../Context";
import "../App.css";

const DoughnutChart = ({ data }) => {
  return (
    <div className="doughnut-chart-container">
      <Doughnut data={data} />
    </div>
  );
};

const MetricsCard = ({ label, value }) => {
  const formattedValue = isNaN(value) ? "N/A" : value.toString();

  return (
    <div className="metric-card">
      <h3>{label}</h3>
      <p>{formattedValue}</p>
    </div>
  );
};
const SmallCharts = () => {
  const { conData } = useContext(DashboardContext);

  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [salesData, setSalesData] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [userActivityData, setUserActivityData] = useState(null);

  useEffect(() => {
    const uniqueYears = [...new Set(conData.map((entry) => entry.Year))];
    setYears(uniqueYears);
    if (uniqueYears.length > 0) {
      setSelectedYear(uniqueYears[0]);
    }
  }, [conData]);
  //   console.log("salesData", salesData);
  useEffect(() => {
    if (!selectedYear) return;

    const filteredSalesData = conData.filter(
      (entry) => entry.Year === selectedYear
    );

    console.log("filteredSalesData", filteredSalesData);

    const sales = filteredSalesData.reduce(
      (acc, entry) => acc + entry.Sales,
      0
    );
    console.log("sales", sales);
    const revenue = filteredSalesData.reduce(
      (acc, entry) => acc + entry.Revenue,
      0
    );
    const userActivity = filteredSalesData.reduce(
      (acc, entry) => acc + entry.UserActivity,
      0
    );

    const totalsByYear = {};

    filteredSalesData.forEach((entry) => {
      const year = entry.Year;
      //   console.log("year", year);

      if (!totalsByYear[year]) {
        totalsByYear[year] = {
          sales: 0,
          revenue: 0,
          userActivity: 0,
        };
      }

      Object.values(entry.Category).forEach((category) => {
        category.forEach((product) => {
          totalsByYear[year].sales += product.Sales;
          totalsByYear[year].revenue += product.Revenue;
          totalsByYear[year].userActivity += product.UserActivity;
        });
      });
    });

    console.log(totalsByYear);

    const salesChartData = {
      labels: ["Sales"],
      datasets: [
        {
          data: [totalsByYear[selectedYear]?.sales || 0],
          backgroundColor: ["rgba(255, 99, 132, 0.7)"],
          borderColor: "rgba(255, 255, 255, 0.8)",
          borderWidth: 1,
          hoverOffset: 10,
        },
      ],
    };

    const revenueChartData = {
      labels: ["Revenue"],
      datasets: [
        {
          data: [totalsByYear[selectedYear]?.revenue || 0],
          backgroundColor: ["rgba(54, 162, 235, 0.7)"],
          borderColor: "rgba(255, 255, 255, 0.8)",
          borderWidth: 1,
          hoverOffset: 10,
        },
      ],
    };

    const userActivityChartData = {
      labels: ["User Activity"],
      datasets: [
        {
          data: [totalsByYear[selectedYear]?.userActivity || 0],
          backgroundColor: ["rgba(255, 205, 86, 0.7)"],
          borderColor: "rgba(255, 255, 255, 0.8)",
          borderWidth: 1,
          hoverOffset: 10,
        },
      ],
    };

    setSalesData(salesChartData);
    setRevenueData(revenueChartData);
    setUserActivityData(userActivityChartData);
  }, [conData, selectedYear]);

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  return (
    <div className="doughnut-charts-container">
      <div style={{ margin: "auto" }}>
        <h3 style={{ textAlign: "center" }}>Complete Products</h3>
        <div className="selectBox">
          <select value={selectedYear || ""} onChange={handleYearChange}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div
          className="doughnutCh"
          style={
            {
              // border: "1px solid blue",
            }
          }
        >
          <div className="borderRa">
            {salesData && <DoughnutChart data={salesData} />}
            {salesData && (
              <MetricsCard label="" value={salesData.datasets[0].data[0]} />
            )}
          </div>
          <div className="borderRa">
            {revenueData && <DoughnutChart data={revenueData} />}
            {revenueData && (
              <MetricsCard label="" value={revenueData.datasets[0].data[0]} />
            )}
          </div>
          <div className="borderRa">
            {userActivityData && <DoughnutChart data={userActivityData} />}
            {userActivityData && (
              <MetricsCard
                label=""
                value={userActivityData.datasets[0].data[0]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallCharts;
