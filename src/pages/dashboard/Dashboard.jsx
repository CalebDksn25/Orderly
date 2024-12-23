import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div style={{ marginLeft: "20%", paddingTop: "60px" }}>
        <h1>Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
