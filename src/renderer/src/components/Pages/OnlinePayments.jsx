import React, { useState, useEffect } from "react";

const OnlinePayments = () => {
  const [retailData, setRetailData] = useState([]);
  const [wholesaleData, setWholesaleData] = useState([]);
  const [randomData, setRandomData] = useState([]);
  const [retailAmount, setRetailAmount] = useState("");
  const [retailDetails, setRetailDetails] = useState("");
  const [wholesaleAmount, setWholesaleAmount] = useState("");
  const [wholesaleDetails, setWholesaleDetails] = useState("");
  const [randomAmount, setRandomAmount] = useState("");
  const [randomDetails, setRandomDetails] = useState("");
  const [totalPreviousDay, setTotalPreviousDay] = useState(0);

  // State for showing calculated totals
  const [showRetailTotal, setShowRetailTotal] = useState(false);
  const [showWholesaleTotal, setShowWholesaleTotal] = useState(false);
  const [showRandomTotal, setShowRandomTotal] = useState(false); // New state for random total visibility
  const [showNetTotal, setShowNetTotal] = useState(false);

  // Calculate Retail Total
  const retailTotal = retailData.reduce((acc, item) => acc + item.amount, 0);

  // Calculate Wholesale Total
  const wholesaleTotal = wholesaleData.reduce((acc, item) => acc + item.amount, 0);

  // Calculate Random Total
  const randomTotal = randomData.reduce((acc, item) => acc + item.amount, 0); // Calculate total for random payments

  // Calculate Net Total
  const netTotal = retailTotal + wholesaleTotal;

  // Fetch Total Easypaisa of the Previous Day from the database
  useEffect(() => {
    const fetchPreviousDayTotal = async () => {
      const previousDayTotal = 2000; 
      setTotalPreviousDay(previousDayTotal);
    };
    fetchPreviousDayTotal();
  }, []);

  // Add Retail Entry
  const handleAddRetail = () => {
    if (retailAmount.trim() !== "" && !isNaN(retailAmount)) {
      setRetailData([...retailData, { amount: parseFloat(retailAmount), details: retailDetails }]);
      setRetailAmount("");
      setRetailDetails("");
    }
  };

  // Add Wholesale Entry
  const handleAddWholesale = () => {
    if (wholesaleAmount.trim() !== "" && !isNaN(wholesaleAmount)) {
      setWholesaleData([
        ...wholesaleData,
        { amount: parseFloat(wholesaleAmount), details: wholesaleDetails },
      ]);
      setWholesaleAmount("");
      setWholesaleDetails("");
    }
  };

  // Add Random Payment Entry
  const handleAddRandom = () => {
    if (randomAmount.trim() !== "" && !isNaN(randomAmount)) {
      setRandomData([...randomData, { amount: parseFloat(randomAmount), details: randomDetails }]);
      setRandomAmount("");
      setRandomDetails("");
    }
  };

  // Delete a row
  const handleDelete = (index, setData) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: "20px" }}>

      {/* Total Easypaisa of Previous Day */}
      <div style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "bold" }}>
        Total Easypaisa of Previous Day: {totalPreviousDay}
      </div>

      {/* Button to show Net Total */}
      <button onClick={() => setShowNetTotal(!showNetTotal)} style={buttonStyle}>
        {showNetTotal ? "Hide Net Total" : "Show Net Total"}
      </button>
      {showNetTotal && (
        <div style={totalStyle}>Net Total (Retail + Wholesale): {netTotal}</div>
      )}

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Easypaisa Retail Table */}
        <div style={{ flex: 1 }}>
          <TableSection
            title="Easypaisa Retail"
            data={retailData}
            amount={retailAmount}
            setAmount={setRetailAmount}
            details={retailDetails}
            setDetails={setRetailDetails}
            onAdd={handleAddRetail}
            onDelete={(index) => handleDelete(index, setRetailData)}
          />
          <button
            onClick={() => setShowRetailTotal(true)}
            style={{ ...buttonStyle, marginBottom: "10px" }}
          >
            Calculate Total
          </button>
          {showRetailTotal && <div style={totalStyle}>Total: {retailTotal}</div>}
        </div>

        {/* Easypaisa Wholesale Table */}
        <div style={{ flex: 1 }}>
          <TableSection
            title="Easypaisa Wholesale"
            data={wholesaleData}
            amount={wholesaleAmount}
            setAmount={setWholesaleAmount}
            details={wholesaleDetails}
            setDetails={setWholesaleDetails}
            onAdd={handleAddWholesale}
            onDelete={(index) => handleDelete(index, setWholesaleData)}
          />
          <button
            onClick={() => setShowWholesaleTotal(true)}
            style={{ ...buttonStyle, marginBottom: "10px" }}
          >
            Calculate Total
          </button>
          {showWholesaleTotal && <div style={totalStyle}>Total: {wholesaleTotal}</div>}
        </div>

        {/* Random Easypaisa Payments Table */}
        <div style={{ flex: 1 }}>
          <TableSection
            title="Random Easypaisa Payments"
            data={randomData}
            amount={randomAmount}
            setAmount={setRandomAmount}
            details={randomDetails}
            setDetails={setRandomDetails}
            onAdd={handleAddRandom}
            onDelete={(index) => handleDelete(index, setRandomData)}
          />
          <button
            onClick={() => setShowRandomTotal(true)} // Button to calculate random total
            style={{ ...buttonStyle, marginBottom: "10px" }}
          >
            Calculate Total
          </button>
          {showRandomTotal && <div style={totalStyle}>Total: {randomTotal}</div>} {/* Display random total */}
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

export default OnlinePayments;
