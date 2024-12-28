/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Remove unused 'functions' import
const { onRequest } = require("firebase-functions/v2/https");
const { google } = require('googleapis');
const logger = require("firebase-functions/logger");

const gmail = google.gmail('v1');

// Example HTTP function
exports.helloWorld = onRequest((req, res) => {
  logger.info("Hello World function triggered"); // Logs a message
  res.send("Hello from Firebase!");
});

exports.countReceiptEmails = onRequest(async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
    });

    const authClient = await auth.getClient();
    google.options({ auth: authClient });

    const response = await gmail.users.messages.list({
      userId: 'me',
      q: 'receipt',
    });

    const count = response.data.resultSizeEstimate;
    res.json({ count });
  } catch (error) {
    logger.error('Error counting receipt emails:', error);
    res.status(500).send('Internal Server Error');
  }
});
