console.log('Hello world');


// Entry Point of the API Server 
const express = require('express');

//To solve cross origin issue
const cors = require('cors');
//To parse body installing library
const bodyParser = require('body-parser');

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
app.get('/hello',(req,res)=>{
res.send('Hello from node backend server');
}); 

app.post('/add',(req,res)=>{
    console.log(req.body);
    res.json(req.body);
    }); 
app.get('/hello',(req,res)=>{
res.send('Hello from node backend server');
}); 
    
app.get('/search',(req,res)=>{
    console.log(req.query);
    res.json( [{
        type: 'house',
        price: '121212',
        phone: '121',
        email: 'abc1',
        description: 'desc1',
        location: 'Ind',
        googleLocation: 'g1',
        for:'sell'
      
      },
      {
        type: 'flate',
        price: '3345',
        phone: '121',
        email: 'abc2',
        description: 'd2',
        location: 'indore',
        googleLocation: 'g2',
        for:'rent'
      }
    ]);
    }); 

// Create a Server and run it on the port 8080
app.listen(port,()=>{
    console.log('Server Started on');
});