
const { YOUR_APP_CLIENT_ID, YOUR_USER_POOL_ID } = require("../config");
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");


const AWS = require("aws-sdk");
const poolData = {
  UserPoolId: YOUR_USER_POOL_ID,
  ClientId: YOUR_APP_CLIENT_ID,
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
module.exports={userPool}