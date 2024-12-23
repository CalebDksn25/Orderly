import React from "react";

const User = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  return (
    <div>
      <h1>User Information</h1>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
};

export default User;
