import Address from '../models/Address.js';
import Property from '../models/Property.js';

// Add Property
export const addProperty = async (req, res) => {
  try {
   
    console.log('in addPropertycls',req.body);
    const {type, price, phone,email, description, location,size,googleLocation,rentOrSell} = req.body;
    const images = req.files.images?.map(file => `uploads/${file.filename}`) || [];
    const videos = req.files.videos?.map(file => `uploads/${file.filename}`) || [];
    console.log('creatind model',req.body);
    const property = new Property({
      type,
      price,
      phone,
      email,
      description,
      location,
      googleLocation,
      rentOrSell,
      size,
      images,
      videos,      
    });
    console.log('before saving',property);
    await property.save();

    const address = new Address({
      location
    });
    console.log('before saving address',address);
    await address.save();

    res.status(201).send(property);
  } catch (error) {
    res.status(400).send(error);
  }
};


// Get Property By Location
export const getPropertyByLocation = async (req, res) => {
  try {
    console.log('in getpropertyByLocationn',req.query);
    const query = {};
    if (req.query.location) query.location = req.query.location; // Match location
    if (req.query.rentOrSell) query.rentOrSell = req.query.rentOrSell; // Match type
    // if (req.query.price) query.price = { $lte: parseFloat(req.query.price) };
    // Fetch data from MongoDB using the built query
    const property = await Property.find(query);

    // let property;
    // if(req.query.rentOrSell) {
    //    property = await Property.find({'location':req.query.location,'rentOrSell':req.query.rentOrSell });
    // }else{
    //    property = await Property.find({'location':req.query.location });
    // }
    
        if (!property) return res.status(404).send();
    res.send(property);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get Property By Location
export const getHello = async (req, res) => {
  try { 
    res.send("hello");
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get Property By Location
export const getAddress = async (req, res) => {
  try {
    console.log('in getAddresses',req.query.location);
    const address = await Address.find();
    console.log('addresses',address);
        if (!address) return res.status(404).send();
    res.send(address);
  } catch (error) {
    res.status(500).send(error);
  }
};


export const saveAddress = async (req, res) => {
  try {
   
    console.log('in SaveAddress',req.body);
    const {location} = req.body;
    const address = new Address({
      location
    });
    console.log('before saving',address);
    await address.save();
    res.status(201).send(address);
  } catch (error) {
    res.status(400).send(error);
  }
};
