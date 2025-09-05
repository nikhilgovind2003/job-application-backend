import express from 'express';
import {
  applyToJob,
  getApplicationsForJob
} from '../controllers/application.Controller.js';
import { protect } from '../middleware/auth.Moddileware.js';

const router = express.Router();

// Protected routes
router.use(protect);
router.post('/apply/:jobId', applyToJob);
router.get('/job/:jobId', getApplicationsForJob);

export default router;
