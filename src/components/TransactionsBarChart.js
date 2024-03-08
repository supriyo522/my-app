// src/components/TransactionsBarChart.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto'; 

const TransactionsBarChart = ({ selectedMonth }) => {
  const [barChartData, setBarChartData] = useState([]);
  const chartRef = useRef(null);

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get(`/api/bar-chart`, {
        params: {
          month: selectedMonth,
        },
      });
      setBarChartData(response.data);
    } catch (error) {
      console.error('Error fetching bar chart data:', error.message);
    }
  };

  useEffect(() => {
    fetchBarChartData();
  }, [selectedMonth]);

  useEffect(() => {
    // Ensure that the chartRef is available before creating the chart
    if (chartRef.current) {
      // Destroy existing chart before rendering a new one
      if (chartRef.current.destroy){
      chartRef.current.destroy();
      }
    }

    // Create a new chart
    const newChart = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: barChartData.map((item) => item.range),
        datasets: [
          {
            label: 'Number of Items',
            data: barChartData.map((item) => item.count),
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          },
        ],
      },
    });

    // Save the chart reference for future use or destruction
    chartRef.current = newChart;

    // Clean up on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [barChartData,selectedMonth]);

  return (
    <div>
      <h2>Transactions Bar Chart {selectedMonth}</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

export default TransactionsBarChart;
