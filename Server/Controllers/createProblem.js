import Problem from '../models/problems.js';
export const createProblem=async (req,res)=>{
    const { name, statement, topic,difficulty, hints, testcases } = req.body;
    const newProblem = new Problem({ name, statement, topic,difficulty, hints, testcases });
    try {
      const savedProblem = await newProblem.save();
      res.status(201).json(savedProblem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };