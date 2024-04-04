import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

export const DashboardContext = createContext();

const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://backendpracticejson.onrender.com/data"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const ContextProvider = ({ children }) => {
  const [conData, setConData] = useState([]);

  useEffect(() => {
    const fetchDataAndProcess = async () => {
      try {
        const fetchedData = await fetchData();
        setConData(fetchedData);

        // const years = fetchedData.map((entry) => entry.Year);
        // const months = fetchedData.map((entry) => entry.Month);
        // const categories = fetchedData.map((entry) => entry.Category);

        // console.log("Years:", years);
        // console.log("Months:", months);
        // console.log("Categories:", categories);
      } catch (error) {
        console.error("Error processing data:", error);
      }
    };

    fetchDataAndProcess();
  }, []);

  const value = {
    conData,
    setConData,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
