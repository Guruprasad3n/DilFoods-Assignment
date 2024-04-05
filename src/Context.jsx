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
        if (conData.length === 0) {
          const fetchedData = await fetchData();
          setConData(fetchedData);
        }
      } catch (error) {
        console.error("Error processing data:", error);
      }
    };

    fetchDataAndProcess();
  }, [conData]); 

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
