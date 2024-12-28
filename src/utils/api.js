import axios from 'axios';
import { auth } from '../firebase/firebaseConfig'; // Import Firebase Auth

const API_URL = 'https://helloworld-ngv4ijsf6q-uc.a.run.app';
const RECEIPT_EMAIL_COUNT_URL = 'https://your-cloud-function-url/countReceiptEmails';

const getAuthToken = async () => {
  const user = auth.currentUser;
  if (user) {
    return user.getIdToken();
  }
  throw new Error('User not authenticated');
};

export const fetchData = async () => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postData = async (data) => {
  try {
    const token = await getAuthToken();
    const response = await axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const getReceiptEmailCount = async () => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(RECEIPT_EMAIL_COUNT_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.count;
  } catch (error) {
    console.error('Error fetching receipt email count:', error);
    throw error;
  }
};
