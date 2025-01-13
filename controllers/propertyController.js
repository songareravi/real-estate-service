import Property from '../models/Property.js';

// Add Property
export const addProperty = async (req, res) => {
  try {
   
    console.log('in addPropertycls',req.body);
    const {type, price, phone,email, description, location,size,googleLocation} = req.body;
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
      videos
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


