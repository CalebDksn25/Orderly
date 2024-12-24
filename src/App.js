import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import User from "./pages/user/User";
import UserInfo from "./pages/userInfo/UserInfo"; // Import the new UserInfo component
import "./firebase/firebaseConfig"; // Ensure Firebase is initialized

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<User />} />
        <Route path="/user-info" element={<UserInfo />} /> {/* New route for user info */}
      </Routes>
    </Router>
  );
}

export default App;