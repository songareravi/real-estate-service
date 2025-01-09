import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import propertyRoutes from './routes/propertyRoutes.js';
import path from 'path';

main().catch(err => console.log(err));

async function main() {
  await connect('mongodb://127.0.0.1:27017/realEsateDb');
  console.log('Connected to db')
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


const app = express();
const port = 8080;
const __dirname = path.resolve();

//Enabling cross origin req by middlewear
app.use(cors());
//adding body parser as middlewear
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use('/api/properties', propertyRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Create a Server and run it on the port 8080
app.listen(port, () => {
  console.log('Server Started on');
});