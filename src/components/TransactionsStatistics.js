// src/components/TransactionsStatistics.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsStatistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({
     totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
    });

  const fetchStatistics = async () => {
    try {
        const response = await axios.get(`/api/statistics`, {
            params: {
              month: selectedMonth,
            },
          });
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error.message);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  return (
    <div>
      <h2>Transactions Statistics</h2>
      {/* Display statistics data */}
      <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
      <p>Total Sold Items: {statistics.totalSoldItems}</p>
      <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
    </div>
  );
};

export default TransactionsStatistics;
