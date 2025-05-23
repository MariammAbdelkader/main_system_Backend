const session = require("express-session");
const Keycloak = require("keycloak-connect");
const { KEYCLOAK_CLIENT_ID, KEYCLOAK_SERVER_URL, KEYCLOAK_REALM, KEYCLOAK_CLIENT_SECRET } = require(".");

const memoryStore = new session.MemoryStore();

const keycloak = new Keycloak(
  { store: memoryStore },
  {
    clientId: KEYCLOAK_CLIENT_ID,
    bearerOnly: true,
    serverUrl: KEYCLOAK_SERVER_URL,
    realm: KEYCLOAK_REALM,
    credentials: {
      secret: KEYCLOAK_CLIENT_SECRET,
    },
  }
);

module.exports = { keycloak, memoryStore };
