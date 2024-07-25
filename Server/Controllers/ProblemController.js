// import Problem from '../models/problems.js';

// export const createProblem = async (req, res) => {
//   const { name, statement, difficulty, hints } = req.body;

//   try {
//     const newProblem = new Problem({ name, statement, difficulty, hints });
//     const problem = await newProblem.save();
//     res.json(problem);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

// export const getProblems = async (req, res) => {
//   try {
//     const problems = await Problem.find();
//     res.json(problems);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

// export const getProblemById = async (req, res) => {
//   try {
//     const problem = await Problem.findById(req.params.id);
//     if (!problem) {
//       return res.status(404).json({ msg: 'Problem not found' });
//     }
//     res.json(problem);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

// export const updateProblem = async (req, res) => {
//   const { name, statement, difficulty, hints } = req.body;

//   try {
//     let problem = await Problem.findById(req.params.id);
//     if (!problem) {
//       return res.status(404).json({ msg: 'Problem not found' });
//     }

//     problem.name = name || problem.name;
//     problem.statement = statement || problem.statement;
//     problem.difficulty = difficulty || problem.difficulty;
//     problem.hints = hints || problem.hints;

//     await problem.save();
//     res.json(problem);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

// export const deleteProblem = async (req, res) => {
//   try {
//     let problem = await Problem.findById(req.params.id);
//     if (!problem) {
//       return res.status(404).json({ msg: 'Problem not found' });
//     }

//     await problem.remove();
//     res.json({ msg: 'Problem removed' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

import Problem from '../models/problems.js';

export const getProblems=async(req,res)=>{
    try {
        const problems=await Problem.find();
        res.json(problems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProblemById=async (req,res)=>{
    try {
        const problem=await Problem.findById(res.params.id);
        if(!problem){
            return res.status(400).json({message:'Problem not found'});
        }
        res.json(problem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProblem=async (req,res)=>{
  const { name, statement, topic, hints, testcases } = req.body;
  const newProblem = new Problem({ name, statement, topic, hints, testcases });
  try {
    const savedProblem = await newProblem.save();
    res.status(201).json(savedProblem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProblem = async (req, res) => {
  const { name, statement, topic, hints, testcases } = req.body;
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    problem.name = name;
    problem.statement = statement;
    problem.topic = topic;
    problem.hints = hints;
    problem.testcases = testcases;
    const updatedProblem = await problem.save();
    res.json(updatedProblem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  };
  
  export const deleteProblem = async (req, res) => {
    try {
      const problem = await Problem.findById(req.params.id);
      if (!problem) {
        return res.status(404).json({ message: 'Problem not found' });
      }
  
      await Problem.deleteOne({ _id: req.params.id });
      res.json({ message: 'Problem deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };