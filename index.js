console.log('Hello world');


// Entry Point of the API Server 
import express from 'express';

//To solve cross origin issue
import cors from 'cors';
//To parse body installing library
import  json  from 'body-parser';
import Property from './models/Property.js';
import { connect } from 'mongoose';
import propertyRoutes from './routes/propertyRoutes.js';

main().catch(err => console.log(err));

async function main() {
  await connect('mongodb://127.0.0.1:27017/realEsateDb');
  console.log('Connected to db')
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


/* Creates an Express application. 
   The express() function is a top-level 
   function exported by the express module.
*/

const app = express();
const port = 8080;

//Enabling cross origin req by middlewear
app.use(cors());
//adding body parser as middlewear
app.use(json());
// Routes
app.use('/api/properties', propertyRoutes);


// Create a Server and run it on the port 8080
app.listen(port, () => {
  console.log('Server Started on');
});