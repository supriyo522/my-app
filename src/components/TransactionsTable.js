// src/components/TransactionsTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsTable = ({selectedMonth}) => {
  const [transactions, setTransactions] = useState([]);
  // const [selectedMonth, setSelectedMonth] = useState('march');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTransactions = async () => {
    try {
        const response = await axios.get(`/api/transactions`, {
            params: {
              month: selectedMonth,
              search: searchText,
              page: currentPage,
            },
          });
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, searchText, currentPage]);

  // const handleMonthChange = (e) => {
  //   setSelectedMonth(e.target.value.toLowerCase());
  // };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      {/* <label>Select Month:</label> */}
      {/* <select value={selectedMonth} onChange={handleMonthChange}> */}
        {/* Add options for each month */}
        {/* You can customize this based on your requirements */}
        {/* <option value="january">January</option>
        <option value="february">February</option>
        <option value="march">March</option>
        <option value="april">April</option>
        <option value="may">May</option>
        <option value="june">June</option>
        <option value="july">July</option>
        <option value="august">August</option>
        <option value="september">September</option>
        <option value="october">October</option>
        <option value="november">November</option>
        <option value="december">December</option>
      </select> */}

      <input type="text" placeholder="Search transactions..." value={searchText} onChange={handleSearchChange} />

      <table>
        <thead>
        </thead>
        <tbody>
      
          {transactions.map((transaction) => (
            <tr key={transaction.id}>

            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handlePrevPage}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default TransactionsTable;
