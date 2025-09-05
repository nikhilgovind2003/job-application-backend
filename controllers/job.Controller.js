import { jobModel } from '../models/models.js';

// Controller function to get a single job by ID
export const getSingleJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await jobModel.findById(id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    return res.status(200).json({ success: true, data: job });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};


export const createJob = async (req, res) => {
  try {
    const { title, description, company, location, salary } = req.body;

    const job = new jobModel({
      title,
      description,
      company,
      location,
      salary,
      createdBy: req.user._id,
    });

    await job.save();
    return res.status(201).json({ success: true, status: 201, data: job });
  } catch (error) {
    return res.status(500).json({ success: false, status: 500, message: 'Failed to create job', error: error.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await jobModel.find().populate('createdBy', 'name email -_id')
    return res.status(200).json({ success: true, status: 200, data: jobs });
  } catch (error) {
    return res.status(500).json({ success: false, status: 500, message: 'Failed to fetch jobs', error: error.message });
  }
};

export const getMyJobs = async (req, res) => {
  try {
    const jobs = await jobModel.find({ createdBy: req.user._id }).populate('createdBy', 'name email -_id');
    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    return res.status(500).json({ success: false, status: 500, message: 'Failed to fetch your jobs', error: error.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await jobModel.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, status: 404, message: 'Job not found' });
    }

    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, status: 403, message: 'Not authorized' });
    }

    const { title, description, company, location, salary } = req.body;
    
    job.title = title || job.title;
    job.description = description || job.description;
    job.company = company || job.company;
    job.location = location || job.location;
    job.salary = salary || job.salary;

    const updatedJob = await job.save();
    return res.status(200).json({ success: true, status: 200, data: updatedJob });
  } catch (error) {
    return res.status(500).json({ success: false, status: 500, message: 'Failed to update job', error: error.message });
  }
};




export const deleteJob = async (req, res) => {
  try {
    console.log(req.params.id)
    const job = await jobModel.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, status: 404, message: 'Job not found' });
    }

    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, status: 403, message: 'Not authorized' });
    }

    await job.deleteOne();
    return res.status(200).json({ success: true, status: 200, message: 'Job deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, status: 500, message: 'Failed to delete job', error: error.message });
  }
};
