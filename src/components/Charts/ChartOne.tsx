"use client"; // Marking the component as a client component

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion"; // Import Framer Motion

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartProps {
  energyUsage?: number[]; // Make it optional
  efficiency?: number[];  // Make it optional
}

const ChartOne: React.FC<ChartProps> = ({ energyUsage, efficiency }) => {
  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: [2, 2],
      curve: "smooth", // Use 'smooth' for a better line appearance
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      title: {
        text: "Months",
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Values",
        style: {
          fontSize: "12px",
        },
      },
      min: 0,
      max: 100, // Adjust based on your expected values
      labels: {
        formatter: (value) => {
          return value.toFixed(0); // Remove extra decimal places
        },
      },
    },
  };

  // Update series with dynamic data
  const series = [
    {
      name: "Energy Usage",
      data: Array(12)
        .fill(0)
        .map((_, index) => (index === 0 ? energyUsage : Math.random() * 100)), // Update with energyUsage and random values
    },
    {
      name: "Efficiency",
      data: Array(12)
        .fill(0)
        .map((_, index) => (index === 0 ? efficiency : Math.random() * 100)), // Update with efficiency and random values
    },
  ];

  const sanitizedSeries = series.map((s) => ({
    ...s,
    data: s.data.flat().filter((d) => d !== undefined) as (number | null)[], // Flatten and sanitize
  }));

  // Animation variants for fade and pop-in effect
  const chartVariants = {
    hidden: { opacity: 0, y: 20 }, // Start hidden with slight Y translation
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" }, // Smooth transition
    },
  };

  return (
    // Apply motion.div with the defined animation
    <motion.div
      className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8"
      variants={chartVariants} // Attach animation variants
      initial="hidden" // Start with hidden state
      animate="visible" // Animate to visible state
    >
      <div>
        <ReactApexChart
          options={options}
          series={sanitizedSeries}
          type="line"
          height={350}
          width={"100%"}
        />
      </div>
    </motion.div>
  );
};

export default ChartOne;
