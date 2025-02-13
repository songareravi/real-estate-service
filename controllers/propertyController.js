import Address from '../models/Address.js';
import Property from '../models/Property.js';
import User from '../models/User.js';

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
    if (req.query.type) query.type = req.query.type; // Match type
    if (req.query.priceMin) query.price = { $gte: parseFloat(req.query.priceMin) };
    if (req.query.priceMax) query.price = { $lte: parseFloat(req.query.priceMax) };
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
    console.log('in getAddresses',req.query);
    console.log('in getAddresses',req.query.location);
    const location = req.query.location;
    //MongoDB Equivalent Query(using the MongoDB shell or a tool like MongoDB Compass)cls
    //db.addresses.find({ location: { $regex: '^vi', $options: 'i' } })

     // Use a regular expression to match documents where 'location' starts with the input i is for caes insensitive search
      const address = await Address.find({ location: new RegExp(`^${location}`, 'i') });
    // const address = await Address.find();
   // console.log('addresses',address);
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



//Login 
export const login =async (req, res) => async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
}

export const updateProperty = async (req, res) => {
  try {
   
    // console.log('in SaveAddress',req.body);
  
    // console.log('before saving',address);
    await Property.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).send(address);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteProperty = async (req, res) => {
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