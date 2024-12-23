import React from "react";

const Accounts = () => {
  const accounts = []; // This will be populated with account data

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}>
      <button style={{ marginBottom: "20px" }}>Add Account</button>
      {accounts.length === 0 ? (
        <p>No accounts created yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr key={index}>
                <td>{account.name}</td>
                <td>{account.email}</td>
                <td>{account.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Accounts;
