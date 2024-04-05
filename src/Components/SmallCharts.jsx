import React, { useContext, useState, useEffect } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { DashboardContext } from "../Context";
import { Select, Container, Heading } from "@chakra-ui/react";
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
      <p style={{ backgroundColor: "transparent" }}>{formattedValue}</p>
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
  useEffect(() => {
    if (!selectedYear) return;

    const filteredSalesData = conData.filter(
      (entry) => entry.Year === selectedYear
    );

    const totalsByYear = {};

    filteredSalesData.forEach((entry) => {
      const year = entry.Year;

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
        <p  style={{ textAlign: "center", fontSize:"1.5rem" }}>Complete Products</p>
        <Container maxW="md">
          <div className="selectBox">
            <Select value={selectedYear || ""} onChange={handleYearChange}>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </div>
        </Container>
        <div className="doughnutCh">
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
