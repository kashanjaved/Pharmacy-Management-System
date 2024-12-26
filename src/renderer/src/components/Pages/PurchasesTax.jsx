import React, { useState } from "react";

function PurchasesTax() {
  const [taxAmount, setTaxAmount] = useState("");
  const [taxDetails, setTaxDetails] = useState("");
  const [taxTableData, setTaxTableData] = useState([]);

  const [refundAmount, setRefundAmount] = useState("");
  const [refundDetails, setRefundDetails] = useState("");
  const [refundTableData, setRefundTableData] = useState([]);

  const [totalTax, setTotalTax] = useState(0);
  const [totalRefunds, setTotalRefunds] = useState(0);

  const [editTaxIndex, setEditTaxIndex] = useState(null);
  const [editRefundIndex, setEditRefundIndex] = useState(null);

  // Add purchase tax
  const handleAddTax = () => {
    if (taxAmount.trim() !== "" && !isNaN(taxAmount)) {
      setTaxTableData([
        ...taxTableData,
        { amount: parseFloat(taxAmount), details: taxDetails },
      ]);
      setTaxAmount("");
      setTaxDetails("");
    }
  };

  // Add tax refund
  const handleAddRefund = () => {
    if (refundAmount.trim() !== "" && !isNaN(refundAmount)) {
      setRefundTableData([
        ...refundTableData,
        { amount: parseFloat(refundAmount), details: refundDetails },
      ]);
      setRefundAmount("");
      setRefundDetails("");
    }
  };

  // Save edited purchase tax
  const handleSaveTax = (index) => {
    const updatedData = [...taxTableData];
    updatedData[index] = {
      amount: taxAmount !== "" ? parseFloat(taxAmount) : updatedData[index].amount,
      details: taxDetails !== "" ? taxDetails : updatedData[index].details,
    };
    setTaxTableData(updatedData);
    setTaxAmount("");
    setTaxDetails("");
    setEditTaxIndex(null);
  };

  // Save edited tax refund
  const handleSaveRefund = (index) => {
    const updatedData = [...refundTableData];
    updatedData[index] = {
      amount: refundAmount !== "" ? parseFloat(refundAmount) : updatedData[index].amount,
      details: refundDetails !== "" ? refundDetails : updatedData[index].details,
    };
    setRefundTableData(updatedData);
    setRefundAmount("");
    setRefundDetails("");
    setEditRefundIndex(null);
  };

  // Delete row from purchase taxes
  const handleDeleteTax = (index) => {
    const updatedData = taxTableData.filter((_, i) => i !== index);
    setTaxTableData(updatedData);
  };

  // Delete row from tax refunds
  const handleDeleteRefund = (index) => {
    const updatedData = refundTableData.filter((_, i) => i !== index);
    setRefundTableData(updatedData);
  };

  // Calculate total taxes
  const calculateTotalTax = () => {
    const sum = taxTableData.reduce((acc, item) => acc + item.amount, 0);
    setTotalTax(sum);
  };

  // Calculate total refunds
  const calculateTotalRefunds = () => {
    const sum = refundTableData.reduce((acc, item) => acc + item.amount, 0);
    setTotalRefunds(sum);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        {/* Purchase Taxes Table */}
        <div style={{ flex: 1 }}>
          <h3>Tax Purchases</h3>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="number"
              value={taxAmount}
              onChange={(e) => setTaxAmount(e.target.value)}
              placeholder="Enter Tax Amount"
              style={inputStyle}
            />
            <input
              type="text"
              value={taxDetails}
              onChange={(e) => setTaxDetails(e.target.value)}
              placeholder="Enter Details"
              style={inputStyle}
            />
            <button
              onClick={editTaxIndex !== null ? () => handleSaveTax(editTaxIndex) : handleAddTax}
              style={buttonStyle}
            >
              {editTaxIndex !== null ? "Save" : "Add to Table"}
            </button>
          </div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>S.No</th>
                <th style={tableHeaderStyle}>Amount</th>
                <th style={tableHeaderStyle}>Details</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {taxTableData.map((item, index) => (
                <tr key={index}>
                  <td style={tableCellStyle}>{index + 1}</td>
                  <td style={tableCellStyle}>{item.amount}</td>
                  <td style={tableCellStyle}>{item.details}</td>
                  <td style={tableCellStyle}>
                    <button
                      onClick={() => {
                        setTaxAmount(item.amount);
                        setTaxDetails(item.details);
                        setEditTaxIndex(index);
                      }}
                      style={editButtonStyle}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTax(index)}
                      style={deleteButtonStyle}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={calculateTotalTax} style={buttonStyle}>
            Calculate Total
          </button>
          {totalTax > 0 && <div style={totalStyle}>Total Tax: {totalTax}</div>}
        </div>

        {/* Tax Refunds Table */}
        <div style={{ flex: 1 }}>
          <h3>Tax Purchases Returns</h3>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="number"
              value={refundAmount}
              onChange={(e) => setRefundAmount(e.target.value)}
              placeholder="Enter Return Amount"
              style={inputStyle}
            />
            <input
              type="text"
              value={refundDetails}
              onChange={(e) => setRefundDetails(e.target.value)}
              placeholder="Enter Details"
              style={inputStyle}
            />
            <button
              onClick={editRefundIndex !== null ? () => handleSaveRefund(editRefundIndex) : handleAddRefund}
              style={buttonStyle}
            >
              {editRefundIndex !== null ? "Save" : "Add to Table"}
            </button>
          </div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>S.No</th>
                <th style={tableHeaderStyle}>Amount</th>
                <th style={tableHeaderStyle}>Details</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {refundTableData.map((item, index) => (
                <tr key={index}>
                  <td style={tableCellStyle}>{index + 1}</td>
                  <td style={tableCellStyle}>{item.amount}</td>
                  <td style={tableCellStyle}>{item.details}</td>
                  <td style={tableCellStyle}>
                    <button
                      onClick={() => {
                        setRefundAmount(item.amount);
                        setRefundDetails(item.details);
                        setEditRefundIndex(index);
                      }}
                      style={editButtonStyle}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteRefund(index)}
                      style={deleteButtonStyle}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={calculateTotalRefunds} style={buttonStyle}>
            Calculate Total
          </button>
          {totalRefunds > 0 && (
            <div style={totalStyle}>Total Refunds: {totalRefunds}</div>
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
  backgroundColor: "brown",
  marginRight: "5px",
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

export default PurchasesTax;
