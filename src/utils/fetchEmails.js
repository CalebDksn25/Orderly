import { google } from "googleapis";

export const fetchEmails = async (accessToken) => {
  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const gmail = google.gmail({ version: "v1", auth });

    // List messages with a specific query
    const res = await gmail.users.messages.list({
      userId: "me",
      q: "subject:receipt", // Example query to filter emails
    });

    if (!res.data.messages) {
      console.log("No messages found.");
      return [];
    }

    const emails = [];
    for (const message of res.data.messages) {
      const email = await gmail.users.messages.get({
        userId: "me",
        id: message.id,
      });
      emails.push(email.data);
    }

    return emails;
  } catch (error) {
    console.error("Error fetching emails:", error.message);
    throw error;
  }
};