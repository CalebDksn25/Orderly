import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Accounts from "../accounts/Accounts";
import Stores from "../stores/Stores";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "accounts":
        return <Accounts />;
      case "stores":
        return <Stores />;
      default:
        return <h1>Dashboard</h1>;
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
