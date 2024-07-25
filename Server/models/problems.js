// import mongoose from 'mongoose';

// const problemSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   topic: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   }
// });

// const Problems = mongoose.model('Problems', problemSchema);

// export default Problems;

import mongoose from "mongoose";
const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true }
})

const ProblemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    statement: { type: String, required: true },
    topic: { type: String, required: true },
    hints: { type: String, required: false },
    testcases: [testCaseSchema],
    difficulty: { type: String, required: false }
  });

const Problem = mongoose.model('Problem', ProblemSchema);
export default Problem;