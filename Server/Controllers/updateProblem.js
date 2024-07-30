import Problem from '../models/problems.js';
export const updateProblem = async (req, res) => {
    const { name, statement, topic, difficulty, hints, testcases } = req.body;
    try {
      const problem = await Problem.findById(req.params.id);
      if (!problem) {
        return res.status(404).json({ message: 'Problem not found' });
      }
      problem.name = name;
      problem.statement = statement;
      problem.topic = topic;
      problem.difficulty=difficulty;
      problem.hints = hints;
      problem.testcases = testcases;
      const updatedProblem = await problem.save();
      res.json(updatedProblem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    };