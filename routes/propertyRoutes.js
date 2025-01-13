import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  addProperty,
  getPropertyByLocation,
  
//   getAllProperties,
//   getPropertyById,
//   updateProperty,
//   deleteProperty,
} from '../controllers/propertyController.js';

const router = express.Router();
const __dirname = path.resolve();

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
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
router.get('/hii', getPropertyByLocation);
// router.put('/:id', upload.fields([{ name: 'images' }, { name: 'videos' }]), updateProperty);
// router.delete('/:id', deleteProperty);

export default router;
