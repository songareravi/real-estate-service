import express from 'express';
// import multer from 'multer';
import {
  addProperty,
  getPropertyByLocation
//   getAllProperties,
//   getPropertyById,
//   updateProperty,
//   deleteProperty,
} from '../controllers/propertyController.js';

const router = express.Router();

// Multer Setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const upload = multer({ storage });

// Routes
// router.post('/', upload.fields([{ name: 'images' }, { name: 'videos' }]), addProperty);
router.post('/add', addProperty);
// router.get('/search', getAllProperties);
router.get('/search', getPropertyByLocation);
// router.put('/:id', upload.fields([{ name: 'images' }, { name: 'videos' }]), updateProperty);
// router.delete('/:id', deleteProperty);

export default router;
