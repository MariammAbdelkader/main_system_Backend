const express = require("express");
const { login, signup, confirm } = require("../controllers/auth.controller");

const { YOUR_APP_CLIENT_ID, YOUR_USER_POOL_ID } = require("../config");
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");


// const fetch = require("node-fetch");
// global.fetch = fetch;

// const jwkToPem = require("jwk-to-pem");
// const jwt = require("jsonwebtoken");
// const express = require("express");
// const bodyParser = require("body-parser");
// const jwtAuth = require("express-jwt");

const authRouter =express.Router();

// const poolData = {
//   UserPoolId: YOUR_USER_POOL_ID,
//   ClientId: YOUR_APP_CLIENT_ID,
// };
// const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

authRouter.post("/signup",signup)

authRouter.post("/confirm",confirm)
// authRouter.post("/confirm", (req, res) => {
//   const { username, code } = req.body;

//   const userData = {
//     Username: username,
//     Pool: userPool,
//   };

//   const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

//   cognitoUser.confirmRegistration(code, true, (err, result) => {
//     if (err) {
//       return res.status(400).json({ error: err.message });
//     }

//     res.status(200).json({ message: "Email verified successfully", result });
//   });
// });
authRouter.post("/login", login)

// authRouter.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
//     {
//       Username: username,
//       Password: password,
//     }
//   );

//   const userData = {
//     Username: username,
//     Pool: userPool,
//   };

//   const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

//   cognitoUser.authenticateUser(authenticationDetails, {
//     onSuccess: (result) => {
//       res.status(200).json({
//         accessToken: result.getAccessToken().getJwtToken(),
//         idToken: result.getIdToken().getJwtToken(),
//         refreshToken: result.getRefreshToken().getToken(),
//       });
//     },
//     onFailure: (err) => {
//       if (err.code === "UserNotConfirmedException") {
//         return res
//           .status(403)
//           .json({ error: "Please verify your email first." });
//       }

//       res.status(401).json({ error: err.message });
//     },
//   });
// });

module.exports={authRouter}