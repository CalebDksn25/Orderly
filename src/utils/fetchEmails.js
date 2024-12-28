import { gapi } from 'gapi-script'; // Use the gapi library for browser compatibility

const initClient = () => {
  gapi.client.init({
    apiKey: 'AIzaSyC5zQJmngi53FNanSZN4H2DwcmtVSbtHW4', // Use your provided Google API key
    clientId: 'http://785942090176-tp04jqcf6jpu3cqumeulnfqq3e3sn6rj.apps.googleusercontent.com', // Replace with your actual client ID
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
    scope: 'https://www.googleapis.com/auth/gmail.readonly',
  }).then(() => {
    // Ensure the user is signed in
    if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
      gapi.auth2.getAuthInstance().signIn();
    }
  });
};

gapi.load('client:auth2', initClient);

export const fetchEmails = async () => {
  try {
    // Ensure the client is initialized
    await gapi.client.load('gmail', 'v1');

    // Fetch messages from Gmail inbox
    const response = await gapi.client.gmail.users.messages.list({
      userId: 'me',
      q: 'label:inbox',
    });

    // Handle no messages found
    if (!response.result.messages) {
      throw new Error('No messages found');
    }

    // Fetch message details for each message
    const messages = await Promise.all(
      response.result.messages.map(async (message) => {
        const msg = await gapi.client.gmail.users.messages.get({
          userId: 'me',
          id: message.id,
        });
        return msg.result;
      })
    );

    // Return the list of emails
    return messages;
  } catch (error) {
    console.error('Error fetching emails:', error);
    throw error;
  }
};