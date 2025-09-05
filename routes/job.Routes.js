import express from 'express';
import {
  getSingleJob,
  createJob,
  getAllJobs,
  getMyJobs,
  updateJob,
  deleteJob
} from '../controllers/job.Controller.js';
import { protect } from '../middleware/auth.Moddileware.js';

const router = express.Router();

// Public
router.get('/all-jobs', getAllJobs);

// Protected
router.use(protect);
router.post('/', createJob);
router.get('/my-jobs', getMyJobs);
router.get('/singleJob/:id', getSingleJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

export default router;
