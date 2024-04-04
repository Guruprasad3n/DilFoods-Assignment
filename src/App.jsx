import { useState } from "react";
import "./App.css";
import SalesChart from "./Components/SalesChart";
import RevenueChart from "./Components/BarChart";
import UserActivityChart from "./Components/UserActivityChart";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <SalesChart /> */}
      <RevenueChart />
      {/* <UserActivityChart /> */}
    </>
  );
}

export default App;
