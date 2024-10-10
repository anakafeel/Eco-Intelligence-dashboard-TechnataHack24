"use client"; // Marking the component as a client component

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartProps {
  energyUsage: number; // Receive energy usage as a prop
  efficiency: number;  // Receive efficiency as a prop
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
      type: "line", // Ensure line chart type is set
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
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: 0,
      max: 100, // Adjust based on your expected values
    },
  };

  // Update series with dynamic data
  const series = [
    {
      name: "Energy Usage",
      data: Array(12).fill(0).map((_, index) => index === 0 ? energyUsage : Math.random() * 100), // Update with energyUsage and random values
    },
    {
      name: "Efficiency",
      data: Array(12).fill(0).map((_, index) => index === 0 ? efficiency : Math.random() * 100), // Update with efficiency and random values
    },
  ];

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div>
        <ReactApexChart
          options={options}
          series={series}
          type="line" // Make sure the type is set to line
          height={350}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default ChartOne;
