import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="home">
      <header className="hero">
        <h1>Welcome to Orderly</h1>
        <p>The ultimate tool for managing your orders efficiently.</p>
        <button onClick={handleLoginRedirect} className="login-btn">
          Login Now
        </button>
      </header>

      <section className="about">
        <h2>About Orderly</h2>
        <p>
          Orderly is a software solution designed to help sellers manage their
          orders seamlessly. Track your purchases, organize your data, and save
          time with automated features.
        </p>
        <p>Scroll down to explore more about what we offer!</p>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <ul>
          <li>Automated email tracking and order logging</li>
          <li>Customizable dashboards</li>
          <li>Real-time notifications for order updates</li>
        </ul>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
