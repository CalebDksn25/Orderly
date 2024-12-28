import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';
import { fetchData, postData, getReceiptEmailCount } from './utils/api'; // Import API functions
import Signup from "./pages/signup/Signup";
import User from "./pages/user/User";
import UserInfo from "./pages/userInfo/userInfo"; // Import the new UserInfo component
import "./firebase/firebaseConfig"; // Ensure Firebase is initialized
import Spreadsheet from "./pages/spreadsheet/Spreadsheet";

const App = () => {
  const [getResponse, setGetResponse] = useState(null);
  const [postResponse, setPostResponse] = useState(null);
  const [receiptEmailCount, setReceiptEmailCount] = useState(0);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await fetchData();
        setGetResponse(data);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchReceiptEmailCount = async () => {
      try {
        const count = await getReceiptEmailCount();
        setReceiptEmailCount(count);
      } catch (error) {
        console.error('Error fetching receipt email count:', error);
      }
    };

    fetchReceiptEmailCount();
  }, []);

  const handlePostRequest = async () => {
    try {
      const data = { name: 'John Doe', email: 'john.doe@example.com' };
      const response = await postData(data);
      setPostResponse(response);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard receiptEmailCount={receiptEmailCount} />} />
          <Route path="/user" element={<User />} />
          <Route path="/user-info" element={<UserInfo />} />{" "}
          {/* New route for user info */}
        </Routes>
        <Footer />
        <div>
          <h2>GET Response:</h2>
          <pre>{JSON.stringify(getResponse, null, 2)}</pre>
          <button onClick={handlePostRequest}>Send POST Request</button>
          <h2>POST Response:</h2>
          <pre>{JSON.stringify(postResponse, null, 2)}</pre>
        </div>
      </div>
    </Router>
  );
};

export default App;
