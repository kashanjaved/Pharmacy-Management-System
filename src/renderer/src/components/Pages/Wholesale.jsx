import React, { useState } from "react";

function Wholesale() {
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");
  const [tableData, setTableData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const [returnAmount, setReturnAmount] = useState("");
  const [returnDetails, setReturnDetails] = useState("");
  const [returnTableData, setReturnTableData] = useState([]);
  const [returnEditingIndex, setReturnEditingIndex] = useState(null);

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalReturns, setTotalReturns] = useState(0);

  // Add wholesale amount
  const handleAddAmount = () => {
    if (amount.trim() !== "" && !isNaN(amount)) {
      setTableData([...tableData, { amount: parseFloat(amount), details }]);
      setAmount("");
      setDetails("");
    }
  };

  // Edit wholesale amount
  const handleEditAmount = (index) => {
    setEditingIndex(index);
    setAmount(tableData[index].amount.toString());
    setDetails(tableData[index].details);
  };

  // Save edited wholesale amount
  const handleSaveAmount = () => {
    if (editingIndex !== null) {
      const updatedData = [...tableData];
      updatedData[editingIndex].amount = amount.trim() === "" ? updatedData[editingIndex].amount : parseFloat(amount);
      updatedData[editingIndex].details = details.trim() === "" ? updatedData[editingIndex].details : details;
      setTableData(updatedData);
      setEditingIndex(null);
      setAmount("");
      setDetails("");
    }
  };

  // Delete wholesale amount
  const handleDeleteAmount = (index) => {
    const updatedData = [...tableData];
    updatedData.splice(index, 1);
    setTableData(updatedData);
  };

  // Add wholesale return
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

  // Edit wholesale return
  const handleEditReturn = (index) => {
    setReturnEditingIndex(index);
    setReturnAmount(returnTableData[index].amount.toString());
    setReturnDetails(returnTableData[index].details);
  };

  // Save edited wholesale return
  const handleSaveReturn = () => {
    if (returnEditingIndex !== null) {
      const updatedData = [...returnTableData];
      updatedData[returnEditingIndex].amount = returnAmount.trim() === "" ? updatedData[returnEditingIndex].amount : parseFloat(returnAmount);
      updatedData[returnEditingIndex].details = returnDetails.trim() === "" ? updatedData[returnEditingIndex].details : returnDetails;
      setReturnTableData(updatedData);
      setReturnEditingIndex(null);
      setReturnAmount("");
      setReturnDetails("");
    }
  };

  // Delete wholesale return
  const handleDeleteReturn = (index) => {
    const updatedData = [...returnTableData];
    updatedData.splice(index, 1);
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
        {/* Wholesale Amounts Table */}
        <div style={{ flex: 1 }}>
          <h3>Wholesale Amounts</h3>
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
              disabled={editingIndex !== null}
            />
            <button
              onClick={editingIndex === null ? handleAddAmount : handleSaveAmount}
              style={buttonStyle}
            >
              {editingIndex === null ? "Add to Table" : "Save"}
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
                      onClick={() => handleEditAmount(index)}
                      style={editButtonStyle}
                    >
                      Edit
                    </button>
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

        {/* Similar implementation for Wholesale Returns Table */}
        <div style={{ flex: 1 }}>
          <h3>Wholesale Returns</h3>
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
              disabled={returnEditingIndex !== null}
            />
            <button
              onClick={
                returnEditingIndex === null ? handleAddReturn : handleSaveReturn
              }
              style={buttonStyle}
            >
              {returnEditingIndex === null ? "Add to Table" : "Save"}
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
                      onClick={() => handleEditReturn(index)}
                      style={editButtonStyle}
                    >
                      Edit
                    </button>
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

const editButtonStyle = {
  padding: "5px 10px",
  marginRight: "5px",
  backgroundColor: "brown",
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

export default Wholesale;
