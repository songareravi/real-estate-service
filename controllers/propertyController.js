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
      size,
      images,
      videos,
      rentOrSell
    });
    console.log('before saving',property);
    await property.save();
    res.status(201).send(property);
  } catch (error) {
    res.status(400).send(error);
  }
};


// Get Property By Location
export const getPropertyByLocation = async (req, res) => {
  try {
    console.log('in getpropertyByLocationn',req.query.location);
    const property = await Property.find({'location':req.query.location});
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
