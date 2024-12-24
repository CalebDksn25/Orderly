import React, { useState, useEffect } from "react";
import { fetchLinkedEmails } from "../../utils/fetchLinkedEmails"; // Fetch linked emails
import "./accounts.css"; // Custom styles for accounts page

const Accounts = () => {
  const [linkedEmails, setLinkedEmails] = useState([]); // State to store linked emails

  // Fetch linked emails on load
  useEffect(() => {
    const loadLinkedEmails = async () => {
      try {
        const emails = await fetchLinkedEmails(); // Fetch emails from Firestore
        setLinkedEmails(emails); // Initialize state with fetched data
      } catch (error) {
        console.error("Failed to fetch linked emails:", error.message);
      }
    };

    loadLinkedEmails();
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <div className="accounts-container">
      <h1>Manage Linked Accounts</h1>
      <table className="accounts-table">
        <thead>
          <tr>
            <th>Linked Emails</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {linkedEmails.map((email, index) => (
            <tr key={index}>
              <td>{email}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Accounts;
