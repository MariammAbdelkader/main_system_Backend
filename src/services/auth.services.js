const { KEYCLOAK_REALM, KEYCLOAK_SERVER_URL, KEYCLOAK_CLIENT_ID, KEYCLOAK_CLIENT_SECRET } = require("../config");
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const axios = require("axios");
const { userPool } = require("../config/cognito");
const loginService = async (username, password) => {
  try {
    const authenticationDetails =
      new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password,
      });

    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    // Wrap authenticateUser in a promise so we can use await
    const tokens = await new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve({
            accessToken: result.getAccessToken().getJwtToken(),
            idToken: result.getIdToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
          });
        },
        onFailure: (err) => {
          if (err.code === "UserNotConfirmedException") {
            return reject({
              status: 403,
              message: "Please verify your email first.",
            });
          }
          reject({ status: 401, message: err.message });
        },
      });
    });

    return tokens;
  } catch (err) {
    throw err.status
      ? err
      : { status: 500, message: "Unexpected login error." };
  }
};



const signupService = async (username, password, phone_number, given_name) => {
  try {
    const attributeList = [
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "email",
        Value: username,
      }),
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "phone_number",
        Value: phone_number, // Must be in E.164 format
      }),
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "given_name",
        Value: given_name,
      }),
    ];

   
    const result = await new Promise((resolve, reject) => {
      userPool.signUp(
        username,
        password,
        attributeList,
        null,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    return {
      success: true,
      result,
      message: "Registered successfully. Please verify your email.",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || JSON.stringify(error),
    };
  }
};


// const confirmService = (username, code) => {
//   return new Promise((resolve, reject) => {
//     const userData = {
//       Username: username,
//       Pool: userPool,
//     };

//     const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

//     cognitoUser.confirmRegistration(code, true, (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// };


const confirmService = async (username, code) => {
  try {
    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    const result = await new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });

    return result;
  } catch (error) {
    throw new Error(error.message || "Failed to confirm registration");
  }
};

// const keycloakBaseUrl = "http://localhost:8080/";
// const realm = "auth-relm";
// const adminUser = "admin";
// const adminPass = "admin";

// // Get admin access token
// async function getAdminToken() {
//   const params = new URLSearchParams();
//   params.append("grant_type", "password");
//   params.append("client_id", "admin-cli");
//   params.append("username", adminUser);
//   params.append("password", adminPass);

//   const response = await axios.post(
//     `${keycloakBaseUrl}/realms/master/protocol/openid-connect/token`,
//     params
//   );
//   return response.data.access_token;
// }

// // Create user
// async function createUser(token, userData) {
//   const response = await axios.post(
//     `${keycloakBaseUrl}/admin/realms/${realm}/users`,
//     {
//       username: userData.username,
//       email: userData.email,
//       enabled: true,
//       emailVerified: false,
//       credentials: [
//         {
//           type: "password",
//           value: userData.password,
//           temporary: false,
//         },
//       ],
//     },
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );
//   return response;
// }

// // Get user id by username
// async function getUserId(token, username) {
//   const response = await axios.get(
//     `${keycloakBaseUrl}/admin/realms/${realm}/users?username=${username}`,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );
//   return response.data[0]?.id;
// }

// // Send verification email
// async function sendVerificationEmail(token, userId) {
//   await axios.put(
//     `${keycloakBaseUrl}/admin/realms/${realm}/users/${userId}/send-verify-email`,
//     {},
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );
// }

// // Signup endpoint
// async function signupService(req, res) {
//   try {
//     const tokenRes = await axios.post(
//         `${KEYCLOAK_SERVER_URL}/realms/master/protocol/openid-connect/token`,
//         new URLSearchParams({
//           client_id: "admin-cli",
//           grant_type: "password",
//           username: "admin",
//           password: "admin", // Replace with your actual admin password
//         })
//       );

//       const adminToken = tokenRes.data.access_token;
//     await axios.post(
//       `${keycloakBaseUrl}/admin/realms/${realm}/users`,
//       {
//         username: "mahmoud",
//         email: "ahmedkhamies611@gmail.com",
//         enabled: true,
//         emailVerified: false,
//         credentials: [
//           {
//             type: "password",
//             value: "mid111",
//             temporary: false,
//           },
//         ],
//       },
//       {
//         headers: { Authorization: `Bearer ${adminToken}` },
//       }
//     );
//   } catch (err) {
//     console.error(err.response?.data || err.message);
//     res.status(500).send("Failed to create user");
//   }
// }

module.exports={loginService,signupService,confirmService}