import React, { useState } from "react";
import "./App.css";
import RevenueChart from "./Components/BarChart";
import LineChart from "./Components/LineChart";
import PieChart from "./Components/PieChart";
import Chart from "chart.js/auto";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SmallCharts from "./Components/SmallCharts";

function App() {
  return (
    <>
      <div className="">
        <Navbar />
        <SmallCharts />
        <div className="responsive">
          <div style={{ width: "90%" }}>
            <LineChart />
          </div>
          <div style={{ width: "90%" }}>
            <RevenueChart />
          </div>
          <div
            style={{
              width: "70%",
            }}
          >
            <PieChart />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
