import { jobModel, applicationModel } from "../models/models.js";

export const applyToJob = async (req, res) => {
  try {
    const { coverLetter } = req.body;
    const { jobId } = req.params;
    const job = await jobModel.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const application = await applicationModel.create({
      jobId,
      applicantId: req.user._id,
      coverLetter,
    });

    return res.status(201).json({
      application,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to apply", error: error.message });
  }
};
export const getApplicationsForJob = async (req, res) => {
  try {
    const job = await jobModel.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    const applications = await applicationModel
      .find({ jobId: job._id })
      .populate("applicantId", "name email");
    return res.status(201).json({ success: true, applications });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message: "An error occurred while fetching applications",
        success: false,
        error: err.message,
      });
  }
};
