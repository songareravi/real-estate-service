console.log('Hello world');


// Entry Point of the API Server 
const express = require('express');

//To solve cross origin issue
const cors = require('cors');
//To parse body installing library
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/realEsateDb');
  console.log('Connected to db')
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const propertySchema = new mongoose.Schema({
  type: String,
  price: Number,
  phone: String,
  email: String,
  description: String,
  location: String,
  googleLocation: String,
  size: String,
  images: [String],
  videos: [String],

});

const Property = mongoose.model('Property', propertySchema);

/* Creates an Express application. 
   The express() function is a top-level 
   function exported by the express module.
*/

const app = express();
const port = 8080;

//Enabling cross origin req by middlewear
app.use(cors());
//adding body parser as middlewear
app.use(bodyParser.json());

//get:/hello
app.get('/hello', (req, res) => {
  res.send('Hello from node backend server');
});

//Adding API 
app.post('/add', async(req, res) => {
  let property = new Property();
  property.type = req.body.type;
  property.price = req.body.price;
  property.phone = req.body.phone;
  property.email = req.body.email;
  property.description = req.body.description;
  property.location = req.body.location;
  property.googleLocation = req.body.googleLocation;
  property.size = req.body.size;
  // property.images=req.body.images;
  console.log(req.body);  

  const doc = await property.save();
  console.log('data saved in db',doc);
  res.json(doc);
});



app.get('/hello', (req, res) => {
  res.send('Hello from node backend server');
});

app.get('/search', async(req, res) => {
  //console.log(req.query);
 const e = await Property.find({'location':req.query.location});
 console.log(e);
 res.json(e);
  // res.json([{
  //   type: 'house',
  //   price: '121212',
  //   phone: '121',
  //   email: 'abc1',
  //   description: 'desc1',
  //   location: 'Ind',
  //   googleLocation: 'g1',
  //   for: 'sell'

  // },
  // {
  //   type: 'flate',
  //   price: '3345',
  //   phone: '121',
  //   email: 'abc2',
  //   description: 'd2',
  //   location: 'indore',
  //   googleLocation: 'g2',
  //   for: 'rent'
  // },
  // {
  //   type: 'land',
  //   price: '121212',
  //   phone: '121',
  //   email: 'abc1',
  //   description: 'desc1',
  //   location: 'Ind',
  //   googleLocation: 'g1',
  //   for: 'sell'

  // }
  // ]);
});

// Create a Server and run it on the port 8080
app.listen(port, () => {
  console.log('Server Started on');
});