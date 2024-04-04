import React, { useState } from "react";
import "./App.css";
import RevenueChart from "./Components/BarChart";
import LineChart from "./Components/LineChart";
import PieChart from "./Components/PieChart";
import Chart from "chart.js/auto";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <div className="container mx-auto px-4">
        <Navbar />
        <div className="responsive">
          <div style={{ width: "90%" }}>
            <LineChart />
          </div>
          <div style={{ width: "90%" }}>
            <RevenueChart />
          </div>
          <div
            style={{
              minWidth: "400px",
              maxWidth: "800px",
              // height: "200px",
              // border: "1px solid red",
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
