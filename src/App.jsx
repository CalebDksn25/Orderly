import React, { useEffect, Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import { fetchEmails } from "./utils/fetchEmails";
import { filterEmails } from "./utils/filterEmails";
import { parseEmailHtml } from "./utils/parseEmailHtml";
import { validateSchema } from "./utils/schemaValidation";
import emailSchema from "./schemas/emailSchema.json"; // Example schema
import { Buffer } from "buffer";
import process from "process";

// Ensure http2 is not used in the browser environment
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
  window.process = process;
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

const App = () => {
  useEffect(() => {
    const fetchAndProcessEmails = async () => {
      try {
        console.log('Fetching emails...');
        const emails = await fetchEmails();
        console.log('Emails fetched:', emails);
        const filteredEmails = filterEmails(emails, ['receipt']);
        console.log('Filtered emails:', filteredEmails);
        const parsedEmails = filteredEmails.map(email => parseEmailHtml(email.payload.body.data));
        console.log('Parsed emails:', parsedEmails);
        const validEmails = parsedEmails.filter(email => validateSchema(email, emailSchema));
        console.log('Valid emails:', validEmails);
      } catch (error) {
        console.error('Error processing emails:', error);
      }
    };

    fetchAndProcessEmails();
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
