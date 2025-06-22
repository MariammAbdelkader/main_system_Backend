// importing
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./config/swagger.js');

// entities must to be with db.resync() function to create the table
const { PORT, MONGO_URI } = require("./config/index.js");
const { db } =require("./database");
//const associations = require('./models/associations.js');
const { ErrorMiddleware } = require("./middlewares/errors.middlewares.js");
const { authRouter } = require("./routes/website.routes.js");
const { keycloak, memoryStore } = require("./config/keycloak.config.js");
const session = require("express-session");
const   mongoose  = require("mongoose");


global.__basedir = __dirname;

class App {
  constructor() {
    this.app = express();
    this.port = PORT;
    this.initializeApp();
  }


  async initializeApp() {
   // await this.connectToMongoDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.connectToPostgresDatabase();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("=================================");
      console.log(`🚀 App is listening on the port: ${this.port}`);
      console.log("=================================");
    });
  }

  // async connectToMongoDatabase() {
  //   try {
  //     await mongoose.connect(MONGO_URI, {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //     });
  //     await mongoose.connection.db.admin().ping();
  //     console.log("✅ MongoDB connected and alive");
  //   } catch (err) {
  //     console.error("❌ MongoDB connection error:", err);
  //     process.exit(1);
  //   }
  // }

  async connectToPostgresDatabase() {
    try {
      await db.authenticate(); // Test the database connection
      console.log(
        "Connection to the database has been established successfully."
      );
      await db.sync({ alter: true }); // Synchronize models with the database
      console.log("Database synchronization complete.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  initializeMiddlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      cors({
        origin: "http://localhost:3001", //Port of FrontEnd
        credentials: true,
      })
    );



    this.app.use((req, res, next) => {
      // next() should be provided in order to go to next middleware
      console.log("we got reqqq");
      next();
    });
    // this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  initializeRoutes() {
    this.app.use("", authRouter);
  }

  initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}

module.exports = { App };
