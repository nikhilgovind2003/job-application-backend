import mongoose from 'mongoose';



const applicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    coverLetter: {
        type: String,
    },
  });

const Application = mongoose.model('Application', applicationSchema);
export default Application;
