import React, { useState } from "react";

const InOutCash = () => {
    const [previous, setPrevious] = useState(10000); // Simulated previous day's total from the database
    const [rows, setRows] = useState(Array(10).fill("")); // Default values for 10 rows
    const [grandTotal, setGrandTotal] = useState(null); // State to store the grand total

    // Handle input change for dynamic rows
    const handleInputChange = (index, value) => {
        const updatedRows = [...rows];
        updatedRows[index] = value;
        setRows(updatedRows);
    };

    // Calculate row total based on "+" or "-" sign
    const calculateRowValue = (value) => {
        if (!value) return 0;
        const num = parseFloat(value.replace(/[^\d.-]/g, "")); // Extract numeric value
        return isNaN(num) ? 0 : num; // Interpret "-" in the value correctly
    };

    // Calculate grand total
    const handleCalculateTotal = () => {
        const total = rows.reduce((acc, value) => acc + calculateRowValue(value), previous);
        setGrandTotal(total);
    };

    return (
        <div style={{ padding: "20px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th style={tableHeaderStyle}>Previous</th>
                        <th style={tableHeaderStyle}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Previous Day Total Row */}
                    <tr>
                        <td style={tableCellStyle}>P</td>
                        <td style={tableCellStyle}>{previous}</td>
                    </tr>
                    {/* Dynamic Rows */}
                    {rows.map((value, index) => (
                        <tr key={index}>
                            <td style={tableCellStyle}>P</td>
                            <td style={tableCellStyle}>
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    placeholder="Enter amount"
                                    style={inputStyle}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Calculate Total Button */}
            <button onClick={handleCalculateTotal} style={buttonStyle}>
                Calculate Total
            </button>
            {/* Display Grand Total */}
            {grandTotal !== null && (
                <div style={totalStyle}>
                    Total: {grandTotal}
                </div>
            )}
        </div>
    );
};

// Styles
const tableHeaderStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    textAlign: "left",
};

const tableCellStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "left",
};

const inputStyle = {
    padding: "5px",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "5px",
};

const buttonStyle = {
    marginTop: "10px",
    padding: "8px 15px",
    backgroundColor: "gray",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
};

const totalStyle = {
    marginTop: "10px",
    fontSize: "18px",
    fontWeight: "bold",
    width: "200px",
    backgroundColor: "yellow",
};

export default InOutCash;
