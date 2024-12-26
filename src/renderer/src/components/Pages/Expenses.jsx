import React, { useState } from "react";

const Expenses = () => {
  const [rcExpenses, setRcExpenses] = useState([]);
  const [deraExpenses, setDeraExpenses] = useState([]);
  const [homeExpenses, setHomeExpenses] = useState([]);
  const [rcAmount, setRcAmount] = useState("");
  const [rcDetails, setRcDetails] = useState("");
  const [deraAmount, setDeraAmount] = useState("");
  const [deraDetails, setDeraDetails] = useState("");
  const [homeAmount, setHomeAmount] = useState("");
  const [homeDetails, setHomeDetails] = useState("");

  const [showRcTotal, setShowRcTotal] = useState(false);
  const [showDeraTotal, setShowDeraTotal] = useState(false);
  const [showHomeTotal, setShowHomeTotal] = useState(false);
  const [showNetTotal, setShowNetTotal] = useState(false); // New state for net total

  // Calculate totals for each expense category
  const rcTotal = rcExpenses.reduce((acc, item) => acc + item.amount, 0);
  const deraTotal = deraExpenses.reduce((acc, item) => acc + item.amount, 0);
  const homeTotal = homeExpenses.reduce((acc, item) => acc + item.amount, 0);

  // Calculate net total
  const netTotal = rcTotal + deraTotal + homeTotal;

  // Add RC Expense Entry
  const handleAddRc = () => {
    if (rcAmount.trim() !== "" && !isNaN(rcAmount)) {
      setRcExpenses([...rcExpenses, { amount: parseFloat(rcAmount), details: rcDetails }]);
      setRcAmount("");
      setRcDetails("");
    }
  };

  // Add Dera Expense Entry
  const handleAddDera = () => {
    if (deraAmount.trim() !== "" && !isNaN(deraAmount)) {
      setDeraExpenses([...deraExpenses, { amount: parseFloat(deraAmount), details: deraDetails }]);
      setDeraAmount("");
      setDeraDetails("");
    }
  };

  // Add Home Expense Entry
  const handleAddHome = () => {
    if (homeAmount.trim() !== "" && !isNaN(homeAmount)) {
      setHomeExpenses([...homeExpenses, { amount: parseFloat(homeAmount), details: homeDetails }]);
      setHomeAmount("");
      setHomeDetails("");
    }
  };

  // Delete a row
  const handleDelete = (index, setData) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Net Total Button */}
      <button
        onClick={() => setShowNetTotal((prev) => !prev)}
        style={{ ...buttonStyle, marginBottom: "10px" }}
      >
        {showNetTotal ? "Hide Net Total" : "Show Net Total"}
      </button>
      {showNetTotal && <div style={totalStyle}>Net Total: {netTotal}</div>}

      <div style={{ display: "flex", gap: "20px" }}>
        {/* RC Expenses Table */}
        <div style={{ flex: 1 }}>
          <TableSection
            title="RC Expenses"
            data={rcExpenses}
            amount={rcAmount}
            setAmount={setRcAmount}
            details={rcDetails}
            setDetails={setRcDetails}
            onAdd={handleAddRc}
            onDelete={(index) => handleDelete(index, setRcExpenses)}
          />
          <button
            onClick={() => setShowRcTotal(true)}
            style={{ ...buttonStyle, marginBottom: "10px" }}
          >
            Calculate Total
          </button>
          {showRcTotal && <div style={totalStyle}>Total: {rcTotal}</div>}
        </div>

        {/* Dera Expenses Table */}
        <div style={{ flex: 1 }}>
          <TableSection
            title="Dera Expenses"
            data={deraExpenses}
            amount={deraAmount}
            setAmount={setDeraAmount}
            details={deraDetails}
            setDetails={setDeraDetails}
            onAdd={handleAddDera}
            onDelete={(index) => handleDelete(index, setDeraExpenses)}
          />
          <button
            onClick={() => setShowDeraTotal(true)}
            style={{ ...buttonStyle, marginBottom: "10px" }}
          >
            Calculate Total
          </button>
          {showDeraTotal && <div style={totalStyle}>Total: {deraTotal}</div>}
        </div>

        {/* Home Expenses Table */}
        <div style={{ flex: 1 }}>
          <TableSection
            title="Home Expenses"
            data={homeExpenses}
            amount={homeAmount}
            setAmount={setHomeAmount}
            details={homeDetails}
            setDetails={setHomeDetails}
            onAdd={handleAddHome}
            onDelete={(index) => handleDelete(index, setHomeExpenses)}
          />
          <button
            onClick={() => setShowHomeTotal(true)}
            style={{ ...buttonStyle, marginBottom: "10px" }}
          >
            Calculate Total
          </button>
          {showHomeTotal && <div style={totalStyle}>Total: {homeTotal}</div>}
        </div>
      </div>
    </div>
  );
};

const TableSection = ({ title, data, amount, setAmount, details, setDetails, onAdd, onDelete }) => {
  return (
    <div>
      <h3>{title}</h3>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
          style={inputStyle}
        />
        <input
          type="text"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Enter Details"
          style={inputStyle}
        />
        <button onClick={onAdd} style={buttonStyle}>
          Add to Table
        </button>
      </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>S.No</th>
            <th style={tableHeaderStyle}>Amount</th>
            <th style={tableHeaderStyle}>Details</th>
            <th style={tableHeaderStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={tableCellStyle}>{index + 1}</td>
              <td style={tableCellStyle}>{item.amount}</td>
              <td style={tableCellStyle}>{item.details}</td>
              <td style={tableCellStyle}>
                <button onClick={() => onDelete(index)} style={deleteButtonStyle}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Styles
const inputStyle = {
  padding: "8px",
  marginRight: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  width: "100px",
};

const buttonStyle = {
  padding: "8px 15px",
  backgroundColor: "gray",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const deleteButtonStyle = {
  padding: "5px 10px",
  backgroundColor: "brown",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "10px",
};

const tableHeaderStyle = {
  border: "1px solid #ccc",
  padding: "5px",
  backgroundColor: "#f8f9fa",
};

const tableCellStyle = {
  border: "1px solid #ccc",
  padding: "5px",
};

const totalStyle = {
  marginTop: "10px",
  fontSize: "18px",
  fontWeight: "bold",
  width: "200px",
  backgroundColor: "yellow",
};

export default Expenses;
