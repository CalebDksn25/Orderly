import axios from "axios";

const TEMPLATE_SPREADSHEET_ID = "1ybKw09ZTg-3NrdQh3ST6YdCrmVBV-SWnIqiB_UYrhmI"; // Replace with your template's ID

export const createSpreadsheetForUser = async (token) => {
  try {
    const response = await axios.post(
      `https://www.googleapis.com/drive/v3/files/${TEMPLATE_SPREADSHEET_ID}/copy`,
      {
        name: "User's Spreadsheet", // Name of the new spreadsheet
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const newSpreadsheetId = response.data.id;
    console.log("Spreadsheet created successfully:", newSpreadsheetId);
    return newSpreadsheetId;
  } catch (error) {
    console.error("Error creating spreadsheet:", error.message);
    console.error("Token used:", token); // Log the token for debugging
    throw error;
  }
};
