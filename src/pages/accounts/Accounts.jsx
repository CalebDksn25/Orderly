import React, { useState, useEffect } from "react";
import { googleLogin } from "../../utils/googleLogin"; // Function for Google login
import {
  saveLinkedEmail,
  deleteLinkedEmail,
} from "../../utils/saveLinkedEmail"; // Save and delete linked emails
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

  // Add a new linked email
  const handleAddEmail = async () => {
    try {
      const email = await googleLogin(); // Log in via Google and get the email
      await saveLinkedEmail(email); // Save the email to Firestore
      setLinkedEmails((prev) => [...prev, email]); // Update the state to show new email
    } catch (error) {
      console.error("Failed to add email:", error.message);
    }
  };

  // Delete a linked email
  const handleDeleteEmail = async (email) => {
    try {
      await deleteLinkedEmail(email); // Delete the email from Firestore
      setLinkedEmails((prev) => prev.filter((e) => e !== email)); // Update the state to remove the email
    } catch (error) {
      console.error("Failed to delete email:", error.message);
    }
  };

  return (
    <div className="accounts-container">
      <h1>Manage Linked Accounts</h1>
      <button onClick={handleAddEmail} className="add-account-button">
        Add Account
      </button>
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
              <td>
                <button
                  onClick={() => handleDeleteEmail(email)}
                  className="delete-account-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Accounts;
