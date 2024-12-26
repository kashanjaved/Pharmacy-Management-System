import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const navbarStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#333",
    padding: "10px 20px",
    top: 0,
    width: "100%",
    height: "50px",
    marginLeft: "-8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    padding: "8px 15px",
    fontSize: "16px",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  };

  const dropdownStyle = {
    position: "absolute",
    width: "100px",
    backgroundColor: "#444",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    listStyle: "none",
    padding: "10px",
    borderRadius: "4px",
    display: dropdownVisible ? "block" : "none",
  };

  const dropdownItemStyle = {
    color: "white",
    textDecoration: "none",
    padding: "5px 10px",
    display: "block",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  };

  const linkHoverStyle = {
    backgroundColor: "#575757",
  };

  return (
    <div style={navbarStyle}>
      <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0 }}>
        <li>
          <Link
            to="/wholesale"
            style={linkStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#575757")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            Whole Sale
          </Link>
        </li>
        {/* Purchases Dropdown */}
        <li
          style={{ position: "relative" }}
          onMouseEnter={() => setDropdownVisible(true)}
          onMouseLeave={() => setDropdownVisible(false)}
        >
          <span
            style={{
              ...linkStyle,
              cursor: "pointer",
            }}
          >
            Purchases
          </span>
          <ul style={dropdownStyle}>
            <li>
              <Link
                to="/tax"
                style={dropdownItemStyle}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#575757")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Tax
              </Link>
            </li>
            <li>
              <Link
                to="/non-tax"
                style={dropdownItemStyle}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#575757")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Non-Tax
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link
            to="/onlinepayments"
            style={linkStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#575757")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            Online Payments
          </Link>
        </li>
        <li>
          <Link
            to="/expenses"
            style={linkStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#575757")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            Expenses
          </Link>
        </li>
        <li>
          <Link
            to="/closingcash"
            style={linkStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#575757")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            Closing Cash
          </Link>
        </li>
        <li>
          <Link
            to="/inoutcash"
            style={linkStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#575757")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            In Out Cash
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
