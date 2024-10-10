"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import axios from "axios"; // For API requests
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";

const MapOne = dynamic(() => import("@/components/Maps/MapOne"), {
  ssr: false,
});

const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
  ssr: false,
});

const ECommerce: React.FC = () => {
  const [modelData, setModelData] = useState({
    totalViews: "",
    totalProfit: "",
    totalProduct: "",
    totalUsers: "",
  });

  // State for input values from sliders
  const [inputValues, setInputValues] = useState({
    users: 0,
    load: 0,
    efficiency: 100, // Start with max efficiency
    energyUsage: 0, // Initialize energyUsage to 0
    temperature: 0,
  });

  // Function to calculate dependent metrics
  const calculateMetrics = (updatedValues: any) => {
    const { users, load } = updatedValues;

    const newEnergyUsage = users * 0.5 + load * 0.3; // Adjust as needed
    const newTemperature = 25 + (load * 0.1) + (users * 0.2); // Realistic heat calculation
    const newEfficiency = Math.max(0, 100 - (newEnergyUsage * 0.1)); // Efficiency calculation

    return {
      energyUsage: newEnergyUsage,
      efficiency: newEfficiency,
      temperature: newTemperature,
    };
  };

  const handleSliderChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValues = {
      ...inputValues,
      [name]: Number(value), // Ensure that this updates the specific slider value
    };

    // Calculate new metrics based on updated values
    const { energyUsage, temperature } = calculateMetrics(updatedValues);

    // Update state with new calculated values
    setInputValues({
      ...updatedValues,
      energyUsage,
      // Don't set efficiency from calculateMetrics since it's controlled by the slider
      temperature,
    });

    // Fetch the prediction data from your API
    try {
      const response = await axios.post(
        "https://technata-24-ai-router-management-system-1.onrender.com/predict",
        { input: Object.values({ ...updatedValues, energyUsage, temperature }) } // Pass input values as an array
      );
      const data = response.data;
      setModelData({
        totalViews: data.totalViews || "$3.456K",
        totalProfit: data.totalProfit || "$45.2K",
        totalProduct: data.totalProduct || "2,450",
        totalUsers: data.totalUsers || `${updatedValues.users}`, // Update totalUsers based on users
      });
    } catch (error) {
      console.error("Error fetching data from the model:", error);
    }
  };

  useEffect(() => {
    // Initialize with default values
    handleSliderChange({ target: { name: 'users', value: 0 } } as any);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {/* Card 1 - Temperature */}
        <CardDataStats
          title="Temperature"
          total={`${inputValues.temperature.toFixed(2)} °C`} // Limit temperature to two decimal places
        />

        {/* Card 2 - Energy Usage */}
        <CardDataStats
          title="Energy Usage"
          total={`${inputValues.energyUsage.toFixed(2)} kWh`} // Using calculated energy usage
        />

        {/* Card 3 - Total Users */}
        <CardDataStats
          title="Total Users"
          total={`${inputValues.users}`} // Using slider value
        />
      </div>

      {/* Sliders for Input Values */}
      <div className="mt-4">
        <h3>Adjust Input Values:</h3>
        <div>
          <label>
            Users:
            <input
              type="range"
              name="users"
              min="0"
              max="100"
              value={inputValues.users}
              onChange={handleSliderChange}
            />
          </label>
        </div>
        <div>
          <label>
            Load:
            <input
              type="range"
              name="load"
              min="0"
              max="1000"
              value={inputValues.load}
              onChange={handleSliderChange}
            />
          </label>
        </div>
        <div>
        </div>
      </div>

      {/* Other Components */}
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;
