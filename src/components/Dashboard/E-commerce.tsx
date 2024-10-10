"use client"; // Marking the component as a client component

import { motion } from "framer-motion"; // Import Framer Motion
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from 'next/image'; // Import the Image component

import CardDataStats from "../CardDataStats";
import TemperatureIcon from './temperature.svg';
import UserIcon from './users-svgrepo-com.svg';
import EfficiencyIcon from './efficiency-performance-speedometer-web-performance-speed-dashboard-svgrepo-com.svg';
import EnergyIcon from './light-bulb-svgrepo-com.svg';

// Dynamically import the Chart component
const ChartOne = dynamic(() => import("../Charts/ChartOne"), {
  ssr: false,
});

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger the animation for each child
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 }, // Cards start slightly below and hidden
  visible: { 
    opacity: 1, 
    y: 0, // Move to the original position
    transition: { duration: 0.5, ease: "easeInOut" }, // Smooth transition
  },
};

const ECommerce: React.FC = () => {
  // State variables
  const [inputValues, setInputValues] = useState({
    users: 0,
    load: 0,
    efficiency: 100,
    energyUsage: 0,
    temperature: 0,
  });

  const [chartData, setChartData] = useState<number[]>([0, 0]); // State for chart data

  // Calculate metrics based on slider values
  const calculateMetrics = (updatedValues: any) => {
    const { users, load, efficiency } = updatedValues;
    const newEnergyUsage = users * 0.5 + load * 0.3; // Calculate energy usage
    const newTemperature = 25 + (load * 0.1) + (users * 0.2); // Calculate temperature
    const newEfficiency = Math.max(0, efficiency - (newEnergyUsage * 0.1)); // Calculate efficiency

    return {
      energyUsage: newEnergyUsage,
      efficiency: newEfficiency,
      temperature: newTemperature,
      users: Math.max(0, users - Math.floor(load / 100)), // Adjust users based on load
    };
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValues = {
      ...inputValues,
      [name]: Number(value),
    };
    const metrics = calculateMetrics(updatedValues);
    setInputValues({ ...updatedValues, ...metrics });

    // Update chart data based on the new metrics
    const newChartData = [metrics.energyUsage, metrics.efficiency]; // Change as necessary
    setChartData(newChartData); // Update the chart data state
  };

  return (
    <>
      {/* Apply animation on the container */}
      <motion.div 
        className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5"
        variants={containerVariants} // Attach variants to container
        initial="hidden" // Start with hidden state
        animate="visible" // Animate to visible state
      >
        <motion.div variants={cardVariants}>
          <CardDataStats title="Temperature" total={`${inputValues.temperature.toFixed(2)} °C`} rate="+" levelUp>
            <div className="dark:invert">
              <Image src={TemperatureIcon} alt="Temperature Icon" width={40} height={40} />
            </div>
          </CardDataStats>
        </motion.div>

        <motion.div variants={cardVariants}>
          <CardDataStats title="Energy Usage" total={`${inputValues.energyUsage?.toFixed(2) || 0} kWh`} rate="+" levelUp>
            <div className="dark:invert">
              <Image src={EnergyIcon} alt="Energy Usage Icon" width={40} height={40} />
            </div>
          </CardDataStats>
        </motion.div>

        <motion.div variants={cardVariants}>
          <CardDataStats title="Total Users" total={`${inputValues.users}`} rate="+" levelUp>
            <div className="dark:invert">
              <Image src={UserIcon} alt="User Icon" width={40} height={40} />
            </div>
          </CardDataStats>
        </motion.div>

        <motion.div variants={cardVariants}>
          <CardDataStats title="Efficiency" total={`${inputValues.efficiency.toFixed(2)} %`} rate="+" levelUp>
            <div className="dark:invert">
              <Image src={EfficiencyIcon} alt="Efficiency Icon" width={40} height={40} />
            </div>
          </CardDataStats>
        </motion.div>
      </motion.div>

      {/* Sliders for Input Values */}
      <div className="mt-4 flex flex-col items-center space-y-4">
        <h3 className="text-lg font-semibold mb-4">Adjust Input Values:</h3>
        <div className="w-full">
          <label className="text-lg font-semibold mb-4">Users</label>
          <input
            type="range"
            name="users"
            min="0"
            max="100"
            value={inputValues.users}
            onChange={handleSliderChange}
            className="w-full"
          />
        </div>
        <div className="w-full">
          <label className="text-lg font-semibold mb-4">Load</label>
          <input
            type="range"
            name="load"
            min="0"
            max="100"
            value={inputValues.load}
            onChange={handleSliderChange}
            className="w-full"
          />
        </div>
        <div className="w-full">
          <label className="text-lg font-semibold mb-4">Energy Efficiency</label>
          <input
            type="range"
            name="efficiency"
            min="0"
            max="100"
            value={inputValues.efficiency}
            onChange={handleSliderChange}
            className="w-full"
          />
        </div>
      </div>

      {/* Charts and other components */}
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne energyUsage={[chartData[0]]} efficiency={[chartData[1]]} /> {/* Pass updated chart data */}
        {/* Add other components here */}
      </div>
    </>
  );
};

export default ECommerce;
