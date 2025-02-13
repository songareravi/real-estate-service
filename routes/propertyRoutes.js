import express from 'express';
import multer from 'multer';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  addProperty,
 
  deleteProperty,
 
  getAddress,
 
  getHello,
  getPropertyByLocation,
  saveAddress,
  updateProperty,
  
//   getAllProperties,
//   getPropertyById,
//   updateProperty,
//   deleteProperty,
} from '../controllers/propertyController.js';
import User from '../models/User.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();
const __dirname = path.resolve();
const SECRET_KEY = "your_secret_key"; // Change this in production

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, './uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });


// Routes
router.post('/add', upload.fields([{ name: 'images' }, { name: 'videos' }]), addProperty);
// router.post('/add', addProperty);
// router.get('/search', getAllProperties);
router.get('/search', getPropertyByLocation);
router.get('/hii', getHello);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);
router.get('/address', getAddress);
router.post('/address', saveAddress);
// router.put('/:id', upload.fields([{ name: 'images' }, { name: 'videos' }]), updateProperty);
// router.delete('/:id', deleteProperty);
// Login Route (Authenticate Admin)
router.post("/login", async (req, res) => {
  console.log('insde login with',req.body);
  const { username, password } = req.body;
  const user = await User.findOne({ username });
console.log("user returned :",user);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});


export default router;
