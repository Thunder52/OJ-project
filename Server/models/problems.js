import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

const Problems = mongoose.model('Problems', problemSchema);

export default Problems;