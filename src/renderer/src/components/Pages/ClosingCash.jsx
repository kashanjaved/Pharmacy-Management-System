import React, { useState } from "react";

const ClosingCash = () => {
    const denominations = [5000, 1000, 500, 100, 50, 20, 10]; // Denominations of notes
    const [quantities, setQuantities] = useState(Array(denominations.length).fill("")); // Quantities for each denomination
    const [damageNotes, setDamageNotes] = useState(""); // Damage Notes input
    const [easypaisa, setEasypaisa] = useState(""); // Easypaisa input

    // Handle quantity input change
    const handleInputChange = (index, value) => {
        const updatedQuantities = [...quantities];
        updatedQuantities[index] = value === "" ? "" : parseInt(value, 10) || 0;
        setQuantities(updatedQuantities);
    };

    // Calculate total for each denomination
    const calculateTotal = (denomination, quantity) => denomination * (quantity || 0);

    // Calculate grand total
    const grandTotal = 
        quantities.reduce((acc, quantity, index) => acc + calculateTotal(denominations[index], quantity), 0) +
        (parseInt(damageNotes, 10) || 0) +
        (parseInt(easypaisa, 10) || 0);

    return (
        <div style={{ padding: "20px" }}>
           
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th style={tableHeaderStyle}>Denomination</th>
                        <th style={tableHeaderStyle}>Quantity</th>
                        <th style={tableHeaderStyle}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {denominations.map((denomination, index) => (
                        <tr key={denomination}>
                            <td style={tableCellStyle}>{denomination}</td>
                            <td style={tableCellStyle}>
                                <input
                                    type="number"
                                    value={quantities[index]}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    style={inputStyle}
                                />
                            </td>
                            <td style={tableCellStyle}>{calculateTotal(denomination, quantities[index])}</td>
                        </tr>
                    ))}
                    {/* Damage Notes Row */}
                    <tr>
                        <td style={tableCellStyle}>Damage Notes</td>
                        <td style={tableCellStyle}>
                            <input
                                type="number"
                                value={damageNotes}
                                onChange={(e) => setDamageNotes(e.target.value)}
                                style={inputStyle}
                            />
                        </td>
                        <td style={tableCellStyle}>{parseInt(damageNotes, 10) || 0}</td>
                    </tr>
                    {/* Easypaisa Row */}
                    <tr>
                        <td style={tableCellStyle}>Easypaisa</td>
                        <td style={tableCellStyle}>
                            <input
                                type="number"
                                value={easypaisa}
                                onChange={(e) => setEasypaisa(e.target.value)}
                                style={inputStyle}
                            />
                        </td>
                        <td style={tableCellStyle}>{parseInt(easypaisa, 10) || 0}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2" style={{ ...tableCellStyle, fontWeight: "bold" }}>TM</td>
                        <td style={{ ...tableCellStyle, fontWeight: "bold" }}>{grandTotal}</td>
                    </tr>
                </tfoot>
            </table>
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
    width: "100px",
    border: "1px solid #ccc",
    borderRadius: "5px",
};

export default ClosingCash;
