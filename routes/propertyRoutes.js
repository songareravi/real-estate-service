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
  login,
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
router.put('/:id', authenticate,updateProperty);
router.delete('/:id', authenticate,deleteProperty);
router.get('/address', getAddress);
router.post('/address', saveAddress);
// router.put('/:id', upload.fields([{ name: 'images' }, { name: 'videos' }]), updateProperty);
// router.delete('/:id', deleteProperty);
// Login Route (Authenticate Admin)
router.post("/login", login);


export default router;
