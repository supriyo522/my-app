import logo from './logo.svg';
import React, { useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import TransactionsStatistics from './components/TransactionsStatistics';
import TransactionsBarChart from './components/TransactionsBarChart';

import './App.css';

function App() {
  const [selectedMonth, setSelectedMonth] = useState('march');

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value.toLowerCase());
  };
  return (
    <div className="App">
     <h1>Transactions Dashboard</h1>

<label>Select Month:</label>
<select value={selectedMonth} onChange={handleMonthChange}>

  <option value="january">January</option>
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
</select>

<TransactionsTable />
<TransactionsStatistics selectedMonth={selectedMonth} />
<TransactionsBarChart selectedMonth={selectedMonth} />
    </div>
  );
}

export default App;
