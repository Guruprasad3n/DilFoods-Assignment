import React, { useState, createContext, useEffect } from "react";

export const DashboardContext = createContext();
import axios from "axios";
import LoadingIndicator from "./Components/LoadingIndicator";

export const ContextProvider = ({ children }) => {
  const [conData, setConData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backendpracticejson.onrender.com/data"
        );
        setConData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <DashboardContext.Provider value={{ conData }}>
          {children}
        </DashboardContext.Provider>
      )}
    </div>
  );
};
