import { gapi } from 'gapi-script';

export const googleLogin = async () => {
  return new Promise((resolve, reject) => {
    gapi.load('auth2', () => {
      const auth2 = gapi.auth2.init({
        client_id: 'http://785942090176-tp04jqcf6jpu3cqumeulnfqq3e3sn6rj.apps.googleusercontent.com',
      });

      auth2.signIn().then(
        (user) => {
          resolve(user.getBasicProfile());
        },
        (error) => {
          console.error("Google login error:", error);
          reject(error);
        }
      );
    });
  });
};
