import { useState } from "react";
import "./App.css";
import RevenueChart from "./Components/BarChart";
import LineChart from "./Components/LineChart";
import PieChart from "./Components/PieChart";
import Chart from "chart.js/auto";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div
       className="responsive"
      >
        <PieChart />
        <LineChart />
        <RevenueChart />
      </div>
    </>
  );
}

export default App;
