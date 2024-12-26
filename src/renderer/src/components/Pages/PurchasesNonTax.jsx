import React, { useState } from "react";

function PurchasesNonTax() {
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");
  const [tableData, setTableData] = useState([]);

  const [returnAmount, setReturnAmount] = useState("");
  const [returnDetails, setReturnDetails] = useState("");
  const [returnTableData, setReturnTableData] = useState([]);

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalReturns, setTotalReturns] = useState(0);

  // Add non-tax purchase amount
  const handleAddAmount = () => {
    if (amount.trim() !== "" && !isNaN(amount)) {
      setTableData([...tableData, { amount: parseFloat(amount), details }]);
      setAmount("");
      setDetails("");
    }
  };

  // Add non-tax purchase return
  const handleAddReturn = () => {
    if (returnAmount.trim() !== "" && !isNaN(returnAmount)) {
      setReturnTableData([
        ...returnTableData,
        { amount: parseFloat(returnAmount), details: returnDetails },
      ]);
      setReturnAmount("");
      setReturnDetails("");
    }
  };

  // Delete row from non-tax purchase amounts
  const handleDeleteAmount = (index) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
  };

  // Delete row from non-tax purchase returns
  const handleDeleteReturn = (index) => {
    const updatedData = returnTableData.filter((_, i) => i !== index);
    setReturnTableData(updatedData);
  };

  // Calculate total amounts
  const calculateTotalAmount = () => {
    const sum = tableData.reduce((acc, item) => acc + item.amount, 0);
    setTotalAmount(sum);
  };

  // Calculate total returns
  const calculateTotalReturns = () => {
    const sum = returnTableData.reduce((acc, item) => acc + item.amount, 0);
    setTotalReturns(sum);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        {/* Non-Tax Purchases Table */}
        <div style={{ flex: 1 }}>
          <h3>Non-Tax Purchases</h3>
          <div style={{ marginBottom: "20px" }}>
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
              placeholder="Enter Detail"
              style={inputStyle}
            />
            <button onClick={handleAddAmount} style={buttonStyle}>
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
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td style={tableCellStyle}>{index + 1}</td>
                  <td style={tableCellStyle}>{item.amount}</td>
                  <td style={tableCellStyle}>{item.details}</td>
                  <td style={tableCellStyle}>
                    <button
                      onClick={() => handleDeleteAmount(index)}
                      style={deleteButtonStyle}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={calculateTotalAmount} style={buttonStyle}>
            Calculate Total
          </button>
          {totalAmount > 0 && (
            <div style={totalStyle}>Total Amount: {totalAmount}</div>
          )}
        </div>

        {/* Non-Tax Purchases Returns Table */}
        <div style={{ flex: 1 }}>
          <h3>Non-Tax Purchases Returns</h3>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="number"
              value={returnAmount}
              onChange={(e) => setReturnAmount(e.target.value)}
              placeholder="Enter Return Amount"
              style={inputStyle}
            />
            <input
              type="text"
              value={returnDetails}
              onChange={(e) => setReturnDetails(e.target.value)}
              placeholder="Enter Details"
              style={inputStyle}
            />
            <button onClick={handleAddReturn} style={buttonStyle}>
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
              {returnTableData.map((item, index) => (
                <tr key={index}>
                  <td style={tableCellStyle}>{index + 1}</td>
                  <td style={tableCellStyle}>{item.amount}</td>
                  <td style={tableCellStyle}>{item.details}</td>
                  <td style={tableCellStyle}>
                    <button
                      onClick={() => handleDeleteReturn(index)}
                      style={deleteButtonStyle}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={calculateTotalReturns} style={buttonStyle}>
            Calculate Total
          </button>
          {totalReturns > 0 && (
            <div style={totalStyle}>Total Returns: {totalReturns}</div>
          )}
        </div>
      </div>
    </div>
  );
}

// Styles
const inputStyle = {
  padding: "10px",
  marginRight: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "gray",
  color: "white",
  border: "none",
  borderRadius: "25px",
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
  padding: "10px",
  backgroundColor: "#f8f9fa",
};

const tableCellStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  textAlign: "center",
};

const totalStyle = {
  marginTop: "10px",
  fontSize: "18px",
  fontWeight: "bold",
  width: "200px",
  backgroundColor: "yellow",
};

export default PurchasesNonTax;
