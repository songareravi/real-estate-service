import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import propertyRoutes from './routes/propertyRoutes.js';
import path from 'path';
import bcrypt from 'bcryptjs';
import {MongoClient,ServerApiVersion} from 'mongodb';
import User from './models/User.js';
const uri = "mongodb+srv://adityanair954:Hunchman%401234@real-estate-manager.8uqgb.mongodb.net/realEsateDb?retryWrites=true&w=majority&appName=real-estate-manager";

main().catch(err => console.log(err));

async function main() {
  try{
  // await connect('mongodb://127.0.0.1:27017/realEsateDb');
  await connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsInsecure: true,
  });
  console.log('Connected to db')
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



// const { MongoClient, ServerApiVersion } = require('mongodb');
 
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
 
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);





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
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

// Middleware to serve static files from the React app's build folder
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Seed Admin Credentials (Run only once)
async function seedAdmin() {
  const existingAdmin = await User.findOne({ username: "admin" });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("password", 10);
    await User.create({ username: "admin", password: hashedPassword });
    console.log("Admin Created!");
  }
}
seedAdmin();

// Create a Server and run it on the port 8080
app.listen(port, () => {
  console.log('Server Started on');
});