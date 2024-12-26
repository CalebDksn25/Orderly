import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Accounts from "../accounts/Accounts";
import Stores from "../stores/Stores";
import Spreadsheet from "../spreadsheet/Spreadsheet"; // Corrected path
import "./dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "accounts":
        return <Accounts />;
      case "stores":
        return <Stores />;
      case "spreadsheet":
        return <Spreadsheet />;
      default:
        return (
          <div className="dashboard-container">
            {/* Stock Check Section */}
            <div className="stock-check">
              <h3>Stock Check</h3>
              <div className="days-since">
                <p className="days">12 Days</p>
                <p>since last</p>
              </div>
              <div className="stock-accuracy">
                <p>94% Stock Accuracy</p>
                <div className="arc-placeholder"></div>
              </div>
            </div>

            {/* Past 30 Days Stats Section */}
            <div className="stats">
              <h3>Past 30 Days...</h3>
              <div className="stats-details">
                <div>
                  <h2>1,307</h2>
                  <p>Orders</p>
                </div>
                <div>
                  <h2>867</h2>
                  <p>Shipped</p>
                </div>
                <div>
                  <h2>800</h2>
                  <p>Arrived</p>
                </div>
              </div>
            </div>

            {/* Latest Purchases Section */}
            <div className="latest-purchases">
              <h3>Latest Purchases</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Doe</td>
                    <td>Widget A</td>
                    <td>5</td>
                    <td>12/20/2024</td>
                  </tr>
                  <tr>
                    <td>Jane Smith</td>
                    <td>Widget B</td>
                    <td>3</td>
                    <td>12/18/2024</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      <Header />
      <Navbar setActiveTab={setActiveTab} />
      <div
        style={{
          marginLeft: "20%",
          paddingTop: "60px",
          paddingBottom: "60px",
        }}>
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
