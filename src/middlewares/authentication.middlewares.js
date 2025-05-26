const { CognitoJwtVerifier } = require("aws-jwt-verify");
const { YOUR_USER_POOL_ID, YOUR_APP_CLIENT_ID } = require("../config");
const cognitoVerifier = CognitoJwtVerifier.create({
  userPoolId: YOUR_USER_POOL_ID, // your User Pool ID
  tokenUse: "access", // or 'id' for ID tokens
  clientId: YOUR_APP_CLIENT_ID, // optional: verifies `aud`
});

// Express middleware to verify token
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing token" });
  const token = authHeader.split(" ")[1]; // Bearer <token>
  try {
    const payload = await cognitoVerifier.verify(token);
    // Token is valid. Attach claims to request for use in routes:
    req.user = payload;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports={authMiddleware}
