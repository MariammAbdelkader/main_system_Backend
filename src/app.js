// importing 
const express = require('express');
const morgan = require("morgan");
const cors = require ("cors");
const cookieParser = require("cookie-parser");
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./config/swagger.js');




// entities must to be with db.resync() function to create the table
const { PORT }= require("./config/index.js");
//const { db } =require("./database");
//const associations = require('./models/associations.js');
const { ErrorMiddleware } = require('./middlewares/errors.middlewares.js');


global.__basedir = __dirname;



class App {
    
    constructor() {
        this.app = express();
        this.port = PORT;
        //this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
 }

 listen() {
    this.app.listen(this.port, () => {
      console.log("=================================");
      console.log(`🚀 App is listening on the port: ${this.port}`);
      console.log("=================================");
    });
  }



// async connectToDatabase() {
//   try {
//         await db.authenticate();     // Test the database connection 
//         console.log('Connection to the database has been established successfully.');
//         await db.sync({alter:true});             // Synchronize models with the database
//         console.log('Database synchronization complete.');
//   } catch (error) {
//         console.error('Unable to connect to the database:', error);
//   }
// }


  initializeMiddlewares() {
    this.app.use(morgan('dev'));   
    this.app.use(express.json());   
    this.app.use(cookieParser());   
    this.app.use(cors({
      origin: "http://localhost:8000", //Port of FrontEnd 
      credentials: true, 
    })); // a middleware that alow cors ( requests from other hosts )
  
    this.app.use((req,res,next)=> {    // next() should be provided in order to go to next middleware
      console.log("we got reqqq");
      next();
    })
   // this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
  
  initializeRoutes() {
    // this.app.use("", router);
    // this.app.use("/upload",csvRouter);
   }

  initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}





module.exports = { App };